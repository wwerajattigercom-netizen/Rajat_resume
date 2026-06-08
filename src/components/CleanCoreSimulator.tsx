/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { 
  Terminal, Cpu, FileCode2, Play, CheckCircle2, 
  RotateCw, Layers, Award, ShieldCheck, Sparkles, Copy, Check 
} from "lucide-react";

interface OptionPreset {
  id: string;
  name: string;
  desc: string;
  tableName: string;
  draftEnabled: boolean;
  actions: string[];
  fields: string[];
}

export default function CleanCoreSimulator() {
  const presets: OptionPreset[] = [
    {
      id: "travel",
      name: "Travel Core Side-Extension (BTP)",
      desc: "Cloud-safe travel and accommodation management layer",
      tableName: "ZTRAVEL_CORE_DE",
      draftEnabled: true,
      actions: ["acceptTravel", "rejectTravel", "calculateTotalPrice"],
      fields: ["travel_id", "agency_id", "customer_id", "begin_date", "end_date", "booking_fee", "total_price"]
    },
    {
      id: "booking",
      name: "Flight Booking RAP Handler",
      desc: "Real-time ticket transactional execution ledger",
      tableName: "ZFLIGHT_BOOK_MD",
      draftEnabled: true,
      actions: ["confirmBooking", "cancelBooking", "rebookFlight"],
      fields: ["booking_id", "carrier_id", "connection_id", "flight_date", "flight_price", "currency_code"]
    },
    {
      id: "mcp",
      name: "Sales Agent AI Integration Broker",
      desc: "Conversational NLP query mapper connecting AI agents safely to ERP entities",
      tableName: "ZAI_AGENT_BROKER",
      draftEnabled: false,
      actions: ["authorizeQuery", "logInteraction", "dispatchTelemetry"],
      fields: ["broker_id", "agent_name", "request_payload", "execution_latency", "compliance_score"]
    }
  ];

  const [selectedPresetId, setSelectedPresetId] = useState("travel");
  const [draftOption, setDraftOption] = useState(true);
  const [customTableName, setCustomTableName] = useState("");
  const [selectedActions, setSelectedActions] = useState<string[]>(["acceptTravel", "rejectTravel", "calculateTotalPrice"]);
  
  const [activeFileTab, setActiveFileTab] = useState<"cds" | "bdef" | "abap" | "mapper">("cds");
  const [auditState, setAuditState] = useState<"idle" | "running" | "completed">("idle");
  const [auditStep, setAuditStep] = useState(0);
  const [copiedCode, setCopiedCode] = useState(false);

  const activePreset = presets.find(p => p.id === selectedPresetId) || presets[0];
  const finalTableName = (customTableName.trim().toUpperCase() || activePreset.tableName).replace(/[^A-Z0-9_]/g, "");

  const [customMapCode, setCustomMapCode] = useState("");
  const [mapperOutputs, setMapperOutputs] = useState<string[]>([
    "// Welcome to the interactive SAP RAP Custom Mapping Sandbox.",
    "// Modify the workspace on the left, then click 'Compile S4HANA Mappings' to run verification."
  ]);
  const [executingMap, setExecutingMap] = useState(false);

  // Sync default code template when finalTableName or preset changes
  React.useEffect(() => {
    setCustomMapCode(`" ==========================================
" INTERACTIVE SAP RAP FIELD-MAPPING ENGINE
" Feel free to type, rename keys, or add rules below!
" ==========================================

DEFINE MAPPING_TARGET FROM ${finalTableName}
FOR COMPLIANT BTP SIDE-BY-SIDE INTEGRATION
{
  SOURCE_FIELD: travel_id       => TARGET: CloudTravelUUID    (TYPE: UUID)
  SOURCE_FIELD: agency_id       => TARGET: BTPPartnerID        (RULE: LOOKUP)
  SOURCE_FIELD: customer_id     => TARGET: BTPCustomerID       (RULE: ANONYMIZE)
  SOURCE_FIELD: begin_date      => TARGET: StartDateUtc        (CONVERT: GMT)
  SOURCE_FIELD: end_date        => TARGET: EndDateUtc          (CONVERT: GMT)
  SOURCE_FIELD: booking_fee     => TARGET: BaseExecutionCost   (SCALE: 1.15)
  SOURCE_FIELD: total_price     => TARGET: AggregatedCoreVal    (READ_ONLY)
}

" Trigger compile & execution map tracing to assert Clean Core isolation
EXECUTE_LOCAL_RAP_TRANSACTION_CYCLE.`);
  }, [finalTableName, selectedPresetId]);

  const triggerMapExecution = () => {
    setExecutingMap(true);
    setMapperOutputs([
      "▶ Initializing BTP Cloud Connector mapping daemon process...",
      `▶ Binding S4HANA source schema context: ZR_${finalTableName}...`
    ]);

    setTimeout(() => {
      const lines = customMapCode.split("\n");
      const outputs: string[] = [
        "[COMPILE] Daemon connected successfully to S/4HANA core mock database.",
        `[MAPPING] Asserted direct Namespace decoupling rules for Table ${finalTableName}...`
      ];

      let mappedCount = 0;
      let hasError = false;

      lines.forEach(line => {
        const trimmed = line.trim();
        if (trimmed.toUpperCase().startsWith("SOURCE_FIELD:")) {
          const parts = trimmed.split("=>");
          if (parts.length > 1) {
            const srcPart = parts[0].replace(/SOURCE_FIELD:/i, "").trim();
            const destPart = parts[1].split("(")[0].replace(/TARGET:/i, "").trim();
            outputs.push(`[MAPPED] [S4HANA Core Element] "${srcPart}" mapped to [BTP Side-Extension Attribute] "${destPart}"`);
            mappedCount++;
          }
        }
        if (trimmed.toLowerCase().includes("error") || trimmed.toLowerCase().includes("fail")) {
          hasError = true;
        }
      });

      if (mappedCount === 0) {
        outputs.push("[ALERT] No active custom mapping definitions could be extracted. Applying standard fallback routing strategy.");
        outputs.push(`[RULE] Mapping: ID ➔ CloudUUID`);
        outputs.push(`[RULE] Mapping: PRICE ➔ BaseExecutionCost`);
      }

      if (hasError) {
        outputs.push("[CRITICAL ERROR] Strict validation checks triggered on custom mapping override rules.");
        outputs.push("[ROLLBACK] Secure transactional state reverted safely. Zero core modifications recorded.");
      } else {
        outputs.push(`[SUCCESS] 100% decoupled schema validated! Mapped ${mappedCount || 3} elements to cloud-native endpoints.`);
        outputs.push(`[PIPELINE] Mock synchronized records synced successfully to active BTP tenants.`);
        outputs.push(`  ➔ { ConnectionID: "BTP_RAP_TENANT_SECURE", CompliantCore: true, latency: "2ms" }`);
      }

      setMapperOutputs(outputs);
      setExecutingMap(false);
    }, 1100);
  };

  const toggleAction = (act: string) => {
    if (selectedActions.includes(act)) {
      if (selectedActions.length > 1) {
        setSelectedActions(selectedActions.filter(a => a !== act));
      }
    } else {
      setSelectedActions([...selectedActions, act]);
    }
  };

  const handlePresetSelect = (id: string) => {
    const p = presets.find(pres => pres.id === id);
    if (p) {
      setSelectedPresetId(id);
      setDraftOption(p.draftEnabled);
      setSelectedActions(p.actions);
      setCustomTableName("");
      setAuditState("idle");
      setAuditStep(0);
    }
  };

  // 1. Generate CDS Code
  const getCDSCode = () => {
    const fieldsFormatted = activePreset.fields.map(
      f => `  @UI.lineItem: [ { position: ${activePreset.fields.indexOf(f) * 10 + 10} } ]\n  key ${f.toLowerCase()} as ${f.toUpperCase()};`
    ).join("\n");

    return `@AccessControl.authorizationCheck: #NOT_REQUIRED
@EndUserText.label: '${activePreset.name} CDS Semantic Entity'
@Metadata.allowExtensions: true
define root view entity ZR_${finalTableName}
  as select from ${finalTableName.toLowerCase()}
  composition [0..*] of ZI_${finalTableName}_SUB as _SubItems
{
${fieldsFormatted}

  /* Association definitions for decoupled state check */
  _SubItems
}`;
  };

  // 2. Generate BDEF Code
  const getBDEFCode = () => {
    const actionsFormatted = selectedActions.map(
      a => `  action ( features : instance ) ${a} result [1] $self;`
    ).join("\n");

    const draftConfig = draftOption 
      ? `with draft;\ndefine behavior for ZR_${finalTableName} alias CoreObject\npersistent table ${finalTableName.toLowerCase()}\ndraft table z${finalTableName.substring(0, 10).toLowerCase()}_d\nlock master total checksum LastChangedAt`
      : `define behavior for ZR_${finalTableName} alias CoreObject\npersistent table ${finalTableName.toLowerCase()}\nlock master\nauthorization master ( global )`;

    return `managed implementation in class zcl_bp_${finalTableName.toLowerCase()} unique;
strict ( 2 );
${draftConfig}
{
  create;
  update;
  delete;

  // Validation routines triggered during clean-core transactional cycle
  validation validateDates on save { create; field begin_date, end_date; }
  validation validateAuthority on save { create; update; }

${actionsFormatted}

  // Determination routine for automated computational states
  determination calculateFields on modify { create; field booking_fee; }
}`;
  };

  // 3. Generate ABAP Class Code
  const getABAPCode = () => {
    const methodsFormatted = selectedActions.map(
      a => `  METHOD ${a}.\n    " Modify instance parameters securely without direct Core database overrides\n    READ ENTITIES OF zr_${finalTableName.toLowerCase()} IN LOCAL MODE\n      ENTITY CoreObject\n        ALL FIELDS WITH CORRESPONDING #( keys )\n      RESULT DATA(instances).\n\n    LOOP AT instances ASSIGNING FIELD-SYMBOL(<instance>).\n      " Secure validation rule under Clean Core architecture\n      APPEND VALUE #( %tky = <instance>-%tky ) TO reported-coreobject.\n    ENDLOOP.\n  ENDMETHOD.`
    ).join("\n\n");

    return `CLASS zcl_bp_${finalTableName.toLowerCase()} DEFINITION PUBLIC ABSTRACT FINAL FOR BEHAVIOR OF zr_${finalTableName.toLowerCase()}.\nENDCLASS.\n\nCLASS zcl_bp_${finalTableName.toLowerCase()} IMPLEMENTATION.\n\n  METHOD validateDates.\n    " Read localized travel begin and end dates to ensure chronological correctness\n    READ ENTITIES OF zr_${finalTableName.toLowerCase()} IN LOCAL MODE\n      ENTITY CoreObject\n        FIELDS ( begin_date end_date )\n        WITH CORRESPONDING #( keys )\n      RESULT DATA(lt_instances).\n\n    LOOP AT lt_instances INTO DATA(ls_instance).\n      IF ls_instance-begin_date > ls_instance-end_date.\n        APPEND VALUE #( %tky = ls_instance-%tky ) TO failed-coreobject.\n      ENDIF.\n    ENDLOOP.\n  ENDMETHOD.\n\n${methodsFormatted}\n\nENDCLASS.`;
  };

  const getCodeStr = () => {
    if (activeFileTab === "cds") return getCDSCode();
    if (activeFileTab === "bdef") return getBDEFCode();
    if (activeFileTab === "abap") return getABAPCode();
    return customMapCode;
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(getCodeStr());
    setCopiedCode(true);
    setTimeout(() => setCopiedCode(false), 2000);
  };

  const startAudit = () => {
    setAuditState("running");
    setAuditStep(0);
    const steps = [
      "Verifying clean side-extension API interfaces on SAP BTP...",
      "Asserting complete separation of Standard SAP S/4HANA core elements...",
      "Scanning CDS annotations and authorization-check configurations...",
      "Parsing Object-Oriented behavior implementations for strict class isolation...",
      "Core Database audit completed. Compliance index logged!"
    ];

    const runNextStep = (index: number) => {
      if (index < steps.length) {
        setTimeout(() => {
          setAuditStep(index + 1);
          runNextStep(index + 1);
        }, 1100);
      } else {
        setTimeout(() => {
          setAuditState("completed");
        }, 800);
      }
    };

    runNextStep(0);
  };

  const auditLogs = [
    "[INFO] Initializing Static Clean-Core Compliance Parser v4.2.0...",
    "[SCAN] Scanning CDS associations boundaries... ZR_TRAVEL_CDSE is compliant.",
    "[WARN] Local table bypass detected: verifying Namespace isolated structures...",
    "[SCAN] Verifying strict type safety in ABAP dynamic behavioral routines... Standard verified.",
    "[COMPLIANT] 100% decoupling asserted. Object passes 'Side-by-Side BTP Extension' rules. ZERO standard Core objects modified."
  ];

  return (
    <section id="custom-sandbox" className="py-24 px-4 md:px-8 bg-slate-900/10 border-b border-white/5 relative overflow-hidden">
      <div className="absolute top-10 right-10 w-96 h-96 bg-blue-900/5 rounded-full blur-[100px] pointer-events-none" />
      <div className="absolute bottom-10 left-10 w-80 h-80 bg-emerald-950/5 rounded-full blur-[90px] pointer-events-none" />

      <div className="max-w-6xl mx-auto">
        {/* Title Node */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/20 text-[10px] font-mono font-bold uppercase tracking-wider text-blue-400 mb-4">
            <Sparkles className="w-3 h-3" />
            Interactive Premium Utility
          </span>
          <h2 className="text-3xl sm:text-4xl font-bold font-display text-white tracking-tight leading-tight mb-4">
            The Interactive Clean-Core & <br />SAP RAP Suite Simulator
          </h2>
          <p className="text-slate-405 font-sans text-xs sm:text-sm font-light leading-relaxed max-w-2xl mx-auto">
            Recruiters routinely ask what modern SAP development entails. Experience it first-hand: build cloud-isolated extension structures, compile them on-the-fly, and audit them against zero-modification core standards.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-stretch">
          
          {/* Controls Panel (Left columns) */}
          <div className="lg:col-span-4 flex flex-col justify-between p-6 sm:p-7 bg-slate-950 border border-slate-850 rounded-xl space-y-6">
            
            {/* Step 1: Preset */}
            <div>
              <label className="text-[10px] font-mono text-slate-500 uppercase font-bold block mb-3">
                01. Custom Business Use-Case
              </label>
              <div className="space-y-2.5">
                {presets.map(pres => (
                  <button
                    key={pres.id}
                    onClick={() => handlePresetSelect(pres.id)}
                    className={`w-full text-left p-3.5 rounded border transition-all cursor-pointer ${
                      selectedPresetId === pres.id 
                        ? "bg-slate-900/40 border-blue-500/30 text-white" 
                        : "bg-slate-950 border-white/5 text-slate-400 hover:bg-slate-900/10 hover:text-slate-200"
                    }`}
                  >
                    <span className="font-display font-medium text-xs block mb-0.5">{pres.name}</span>
                    <span className="font-sans text-[10px] text-slate-500 dark:text-slate-400 block line-clamp-1 leading-normal font-light">
                      {pres.desc}
                    </span>
                  </button>
                ))}
              </div>
            </div>

            {/* Step 2: Customize */}
            <div className="space-y-4">
              <label className="text-[10px] font-mono text-slate-500 uppercase font-bold block mb-1">
                02. Object Customization
              </label>

              {/* Table input */}
              <div className="flex flex-col gap-1.5">
                <span className="text-[10px] font-mono text-slate-400">Database Table Name</span>
                <input
                  type="text"
                  placeholder={activePreset.tableName}
                  className="p-2 sm:p-2.5 bg-slate-950 border border-slate-850 rounded text-slate-200 text-xs font-mono outline-none focus:border-blue-500/25 transition-colors uppercase placeholder:text-slate-800"
                  value={customTableName}
                  onChange={(e) => setCustomTableName(e.target.value.substring(0, 25))}
                />
              </div>

              {/* Draft toggle */}
              <div className="flex items-center justify-between p-2.5 bg-slate-900/20 border border-white/5 rounded">
                <div className="space-y-0.5">
                  <span className="text-[10px] font-mono text-slate-350 block">Draft Capability</span>
                  <span className="text-[9px] text-slate-500 block leading-tight">Prevents save loss / buffers transaction</span>
                </div>
                <input
                  type="checkbox"
                  className="w-4 h-4 cursor-pointer accent-blue-500"
                  checked={draftOption}
                  onChange={(e) => setDraftOption(e.target.checked)}
                />
              </div>

              {/* Actions select list */}
              <div className="space-y-1.5">
                <span className="text-[10px] font-mono text-slate-400 block">Behavioral Actions (RAP)</span>
                <div className="grid grid-cols-2 gap-1.5">
                  {activePreset.actions.map(act => {
                    const isSelected = selectedActions.includes(act);
                    return (
                      <button
                        key={act}
                        onClick={() => toggleAction(act)}
                        className={`py-1.5 px-2 rounded text-[10px] font-mono truncate text-center border cursor-pointer transition-all ${
                          isSelected 
                            ? "bg-slate-905 border-blue-500/20 text-blue-400 font-bold" 
                            : "bg-slate-950 border-white/5 text-slate-500 hover:text-slate-350"
                        }`}
                      >
                        {act}
                      </button>
                    );
                  })}
                </div>
              </div>

            </div>

            {/* Step 3: Trigger Audit */}
            <div className="pt-2 border-t border-white/5">
              {auditState === "idle" ? (
                <button
                  type="button"
                  onClick={startAudit}
                  className="w-full flex items-center justify-center gap-2 py-3 bg-blue-650 hover:bg-blue-550 border border-blue-500/20 text-white font-mono text-xs font-bold uppercase tracking-wider rounded transition-colors cursor-pointer"
                >
                  <Play className="w-3.5 h-3.5 fill-current" />
                  <span>Execute Extension Audit</span>
                </button>
              ) : auditState === "running" ? (
                <div className="w-full py-3 bg-slate-900 border border-slate-800 rounded text-center flex items-center justify-center gap-2 font-mono text-xs text-blue-400">
                  <RotateCw className="w-3.5 h-3.5 animate-spin" />
                  <span>Scanning Compliance... {auditStep}/5</span>
                </div>
              ) : (
                <button
                  type="button"
                  onClick={() => { setAuditState("idle"); setAuditStep(0); }}
                  className="w-full py-3 bg-emerald-950/20 border border-emerald-500/25 hover:border-emerald-500/50 text-emerald-400 font-mono text-xs font-bold uppercase tracking-wider rounded transition-colors flex items-center justify-center gap-2 cursor-pointer"
                >
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  <span>Audit Complete</span>
                </button>
              )}
            </div>

          </div>

          {/* Interactive IDE Terminal (Right columns) */}
          <div className="lg:col-span-8 flex flex-col justify-between bg-slate-950 border border-slate-850 rounded-xl overflow-hidden min-h-[480px]">
            {/* Header / Tabs */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between px-4 sm:px-6 py-3.5 bg-slate-950 border-b border-white/5 gap-3">
              <div className="flex items-center gap-2">
                <div className="flex gap-1.5">
                  <span className="w-2.5 h-2.5 rounded-full bg-rose-500/70" />
                  <span className="w-2.5 h-2.5 rounded-full bg-amber-500/70" />
                  <span className="w-2.5 h-2.5 rounded-full bg-emerald-500/70" />
                </div>
                <span className="font-mono text-[9px] text-slate-500 ml-2 uppercase font-bold tracking-widest block">
                  DEPLOYMENT STUDIO • COMPILER ACTIVE
                </span>
              </div>

              {/* Code File Tabs */}
              <div className="flex bg-slate-900/60 p-0.5 rounded border border-white/5 self-start sm:self-auto flex-wrap gap-1">
                <button
                  type="button"
                  onClick={() => { setActiveFileTab("cds"); }}
                  className={`px-2.5 py-1 font-mono text-[10px] rounded transition-all cursor-pointer ${
                    activeFileTab === "cds" 
                      ? "bg-slate-950 text-blue-400 font-bold" 
                      : "text-slate-500 hover:text-slate-350"
                  }`}
                >
                  {finalTableName.substring(0, 9)}_CDSE.asddls
                </button>
                <button
                  type="button"
                  onClick={() => { setActiveFileTab("bdef"); }}
                  className={`px-2.5 py-1 font-mono text-[10px] rounded transition-all cursor-pointer ${
                    activeFileTab === "bdef" 
                      ? "bg-slate-950 text-blue-400 font-bold" 
                      : "text-slate-500 hover:text-slate-350"
                  }`}
                >
                  {finalTableName.substring(0, 9)}_BDEF.asbdef
                </button>
                <button
                  type="button"
                  onClick={() => { setActiveFileTab("abap"); }}
                  className={`px-2.5 py-1 font-mono text-[10px] rounded transition-all cursor-pointer ${
                    activeFileTab === "abap" 
                      ? "bg-slate-950 text-blue-400 font-bold" 
                      : "text-slate-500 hover:text-slate-350"
                  }`}
                >
                  ZBP_{finalTableName.substring(0, 9)}.abap
                </button>
                <button
                  type="button"
                  onClick={() => { setActiveFileTab("mapper"); }}
                  className={`px-2.5 py-1 font-mono text-[10px] rounded transition-all cursor-pointer flex items-center gap-1 ${
                    activeFileTab === "mapper" 
                      ? "bg-amber-500/20 text-amber-400 font-bold border border-amber-500/30" 
                      : "text-slate-500 hover:text-amber-400"
                  }`}
                >
                  <Sparkles className="w-3 h-3 text-amber-500 animate-pulse" />
                  <span>ZCL_MAP_SANDBOX.abap</span>
                </button>
              </div>
            </div>

            {/* IDE Workspace body */}
            <div className="flex-grow p-4 sm:p-6 font-mono text-[11px] sm:text-xs leading-relaxed text-slate-300 overflow-y-auto selection:bg-blue-500/35 selection:text-white h-72">
              {activeFileTab === "mapper" ? (
                <div className="space-y-4 h-full flex flex-col justify-between">
                  <div className="flex flex-col gap-2">
                    <div className="flex items-center justify-between text-[11px] text-amber-500 uppercase font-mono font-bold tracking-wider">
                      <span>⚡ Custom ABAP RAP Mapper (Go Crazy! Try editing fields / rules)</span>
                      <span className="text-[10px] text-slate-500 italic font-mono lowercase">Fully Editable Node Map</span>
                    </div>
                    <textarea
                      className="w-full h-32 p-3.5 bg-slate-900 border border-slate-800 text-amber-500 font-mono text-xs rounded-xl focus:border-amber-500/40 focus:ring-1 focus:ring-amber-500/20 outline-none resize-none leading-relaxed"
                      value={customMapCode}
                      onChange={(e) => setCustomMapCode(e.target.value)}
                    />
                  </div>

                  <div className="space-y-2">
                    <div className="flex items-center justify-between gap-3 flex-wrap">
                      <button
                        type="button"
                        onClick={triggerMapExecution}
                        disabled={executingMap}
                        className="flex items-center gap-2 py-2.5 px-4 bg-amber-500 hover:bg-amber-600 disabled:bg-slate-900 border border-amber-500/20 text-slate-950 disabled:text-slate-650 rounded-xl text-xs font-mono font-bold uppercase cursor-pointer"
                      >
                        {executingMap ? (
                          <RotateCw className="w-3.5 h-3.5 animate-spin" />
                        ) : (
                          <Play className="w-3.5 h-3.5 text-slate-950 fill-current" />
                        )}
                        <span>Compile S4HANA Mappings</span>
                      </button>
                      <span className="text-[10px] text-slate-500 font-mono">BTP Cloud Connector Target Pipeline</span>
                    </div>

                    <div className="p-3.5 bg-slate-900/60 border border-slate-850 rounded-xl text-[10px] font-mono text-slate-400 space-y-1.5 max-h-24 overflow-y-auto">
                      {mapperOutputs.map((log, index) => (
                        <p
                          key={index}
                          className={`${
                            log.startsWith("[SUCCESS]") 
                              ? "text-emerald-400 font-bold" 
                              : log.startsWith("[CRITICAL") || log.startsWith("[ROLLBACK")
                              ? "text-red-400 font-bold"
                              : log.startsWith("[MAPPED]")
                              ? "text-blue-400"
                              : "text-slate-405"
                          }`}
                        >
                          {log}
                        </p>
                      ))}
                    </div>
                  </div>
                </div>
              ) : (
                <pre className="whitespace-pre min-w-max">
                  <code>
                    {getCodeStr()}
                  </code>
                </pre>
              )}
            </div>

            {/* Footer Workspace Console (Action Buttons + Audit reports) */}
            <div className="bg-slate-950 border-t border-white/5 p-4 sm:p-5 flex flex-col gap-4">
              
              {/* Copy & Status Bar */}
              <div className="flex flex-col sm:flex-row items-center justify-between gap-3">
                <div className="flex items-center gap-2 font-mono text-[10px] text-slate-500">
                  <Layers className="w-3.5 h-3.5 text-blue-400" />
                  <span>Upgrade Target: SAP S/4HANA Cloud (Fiori compliant)</span>
                </div>

                <button
                  type="button"
                  onClick={handleCopy}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-slate-900 hover:bg-slate-850 text-[10px] text-slate-300 font-mono border border-slate-800 hover:text-white rounded transition-colors cursor-pointer"
                >
                  {copiedCode ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                  <span>{copiedCode ? "Code Copied!" : "Copy Active Tab"}</span>
                </button>
              </div>

              {/* Expanding Visual Compliance overlay / log container */}
              <AnimatePresence mode="wait">
                {auditState === "running" && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }}
                    className="p-3.5 bg-slate-950 border border-slate-850 rounded text-[10px] font-mono text-slate-400 space-y-1.5"
                  >
                    <p className="text-blue-400 font-bold">▶ COMPLY SCRUTINY PIPELINE ENGINE RUNNING...</p>
                    {auditLogs.slice(0, auditStep).map((log, index) => (
                      <p key={index} className={`leading-relaxed ${log.startsWith("[COMPLIANT]") ? "text-emerald-400 font-bold" : log.startsWith("[WARN") ? "text-amber-400" : "text-slate-400"}`}>
                        {log}
                      </p>
                    ))}
                  </motion.div>
                )}

                {auditState === "completed" && (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.98 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.98 }}
                    className="p-5 bg-gradient-to-r from-emerald-950/20 to-slate-950 border border-emerald-500/20 rounded-xl flex flex-col sm:flex-row items-start sm:items-center justify-between gap-5"
                  >
                    <div className="flex gap-3.5">
                      <div className="w-12 h-12 rounded-full bg-emerald-950/40 border border-emerald-500/25 flex items-center justify-center text-emerald-400 shrink-0">
                        <Award className="w-6 h-6 animate-pulse" />
                      </div>
                      <div className="space-y-1">
                        <h4 className="font-display font-bold text-white text-sm sm:text-base tracking-tight flex items-center gap-1.5">
                          <span>Verified SAP Silver Compliant Core</span>
                          <ShieldCheck className="w-4 h-4 text-emerald-400 inline" />
                        </h4>
                        <p className="text-slate-400 text-xs font-sans leading-relaxed font-light">
                          This side-extension adheres entirely to the modern <strong className="text-white font-medium">Clean Core Blueprint</strong>. Zero alterations on standard schemas means seamless automatic future upgrades!
                        </p>
                      </div>
                    </div>

                    <div className="flex flex-col items-end shrink-0 border-l border-white/5 pl-5 select-none self-stretch justify-center gap-1">
                      <span className="text-[9px] font-mono text-slate-500 uppercase tracking-widest font-bold">COMPLIANCE SCORE</span>
                      <span className="text-2xl font-mono text-emerald-450 font-bold tracking-tight">100/100</span>
                      <span className="text-[8px] font-mono text-emerald-400 uppercase tracking-widest">UPGRADE-SAFE</span>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

            </div>
          </div>

        </div>
      </div>
    </section>
  );
}

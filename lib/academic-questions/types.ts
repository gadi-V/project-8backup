/** Shared academic diagnostic types — no import from diagnostic-questions (avoids cycles). */

export type AcademicDegreeId =
  | "computer-science"
  | "exact-sciences"
  | "engineering";

export type AcademicCourseKey =
  | "CALC"
  | "CALC2"
  | "LINALG"
  | "LINALG2"
  | "CS"
  | "DISCRETE"
  | "INTRO_CS"
  | "ALGORITHMS"
  | "OPERATING_SYSTEMS"
  | "AUTOMATA"
  | "PHYSICS1"
  | "PHYSICS2"
  | "PROB"
  | "ODE"
  | "PDE"
  | "CIRCUITS"
  | "SIGNALS_SYSTEMS"
  | "COMPUTER_ARCHITECTURE"
  | "MECHANICS_MATERIALS"
  | "OPERATIONS_RESEARCH"
  | "DATABASES"
  | "NETWORKS"
  | "MACHINE_LEARNING"
  | "CONTROL_THEORY"
  | "OOP_ADVANCED"
  | "THERMODYNAMICS"
  | "SEMICONDUCTORS"
  | "FLUID_MECHANICS"
  | "COMPILERS"
  | "ELECTROMAGNETICS"
  | "INFORMATION_SECURITY"
  | "ELECTRONIC_CIRCUITS"
  | "ENERGY_CONVERSION"
  | "HEAT_MASS_TRANSFER"
  | "APPLIED_REGRESSION"
  | "DEEP_LEARNING"
  | "KINEMATICS_DYNAMICS"
  | "STOCHASTIC_MODELS"
  | "MACHINE_DESIGN"
  | "PRODUCTION_PLANNING"
  | "NONLINEAR_OPTIMIZATION"
  | "BIG_DATA_ANALYTICS"
  | "ADVANCED_MACHINE_LEARNING"
  | "DATA_TEXT_MINING"
  | "ADVANCED_DATABASES_NOSQL"
  | "SYSTEMS_ANALYSIS_ARCHITECTURE"
  | "SIMULATION_SYSTEMS"
  | "UI_UX_ENGINEERING"
  | "ENGINEERING_ECONOMY"
  | "QUALITY_ENGINEERING"
  | "METHODS_ERGONOMICS"
  | "IS_SECURITY_RISK"
  | "STRUCTURAL_STATICS"
  | "DIGITAL_LOGIC"
  | "DISTRIBUTED_SYSTEMS"
  | "COMPUTER_VISION"
  | "THEORY_COMPUTATION_COMPLEXITY"
  | "COMPLEX_FUNCTIONS"
  | "DIGITAL_COMMUNICATIONS"
  | "GENERAL_CHEMISTRY"
  | "CAD"
  | "MATERIALS_SCIENCE"
  | "MECHANICAL_VIBRATIONS"
  | "FEM"
  | "DIGITAL_CONTROL_ROBOTICS"
  | "PYTHON"
  | "ORGANIZATION_THEORY"
  | "SUPPLY_CHAIN"
  | "GAME_THEORY"
  | "PLANT_LAYOUT"
  | "BI"
  | "INTRO_DS"
  | "NLP";

/** Topic tags for modular reuse across unified / split academic courses. */
export type AcademicQuestionTag =
  | "logic-sets"
  | "combinatorics"
  | "graphs";

export type AcademicDiagnosticOption = {
  id: string;
  mathText?: string;
  plainText?: string;
  isCorrect: boolean;
  explanation: string;
};

export type AcademicDiagnosticQuestion = {
  id: string;
  domain: string;
  title: string;
  context: string;
  instruction: string;
  formulaLatex?: string;
  /** Optional topic tags — e.g. discrete-math split courses. */
  tags?: AcademicQuestionTag[];
  options: AcademicDiagnosticOption[];
};

/** Compact bank shape used by course files that store stem + correctIndex. */
export type DiagnosticQuestion = {
  id: string;
  title: string;
  stem: string;
  options: {
    text: string;
    explanation: string;
  }[];
  correctIndex: number;
};

export interface AcademicCourseMeta {
  id: string; // e.g. "cs-data-structures"
  degreeId: AcademicDegreeId;
  nameHe: string; // e.g. "מבני נתונים"
  questionBank: AcademicDiagnosticQuestion[];
  sampleFunction: () => AcademicDiagnosticQuestion[];
}

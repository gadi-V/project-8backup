import type {
  AcademicCourseKey,
  AcademicCourseMeta,
  AcademicDiagnosticQuestion,
  DiagnosticQuestion,
} from "./types";
import {
  ACADEMIC_CALC_QUESTIONS,
  CALCULUS_QUESTIONS,
  sampleCalculusOnboardingQuestions,
} from "./calculus";
import {
  ACADEMIC_CALC2_QUESTIONS,
  CALCULUS_2_QUESTIONS,
  sampleCalculus2OnboardingQuestions,
} from "./calculus-2";
import {
  ACADEMIC_LINALG_QUESTIONS,
  LINEAR_ALGEBRA_1_QUESTIONS,
  sampleLinearAlgebra1OnboardingQuestions,
} from "./linear-algebra-1";
import {
  ACADEMIC_LINALG2_QUESTIONS,
  LINEAR_ALGEBRA_2_QUESTIONS,
  sampleLinearAlgebra2OnboardingQuestions,
} from "./linear-algebra-2";
import {
  csDataStructuresQuestions,
  sampleCsDataStructuresOnboardingQuestions,
} from "./cs-data-structures";
import {
  ACADEMIC_DISCRETE_MATH_QUESTIONS,
  DISCRETE_MATHEMATICS_QUESTIONS,
  sampleDiscreteMathByTag,
  sampleDiscreteMathOnboardingQuestions,
} from "./discrete-mathematics";
import {
  ACADEMIC_INTRO_CS_QUESTIONS,
  INTRO_CS_QUESTIONS,
  sampleIntroCSOnboardingQuestions,
} from "./intro-cs";
import {
  ACADEMIC_ALGORITHMS_QUESTIONS,
  ALGORITHMS_QUESTIONS,
  sampleAlgorithmsOnboardingQuestions,
} from "./algorithms";
import {
  ACADEMIC_OPERATING_SYSTEMS_QUESTIONS,
  OPERATING_SYSTEMS_QUESTIONS,
  sampleOperatingSystemsOnboardingQuestions,
} from "./operating-systems";
import {
  ACADEMIC_AUTOMATA_QUESTIONS,
  AUTOMATA_QUESTIONS,
  sampleAutomataOnboardingQuestions,
} from "./automata";
import {
  ACADEMIC_ELECTRIC_CIRCUITS_QUESTIONS,
  ELECTRIC_CIRCUITS_QUESTIONS,
  sampleCircuitsOnboardingQuestions,
} from "./electric-circuits";
import {
  ACADEMIC_PHYSICS_1_QUESTIONS,
  PHYSICS_1_QUESTIONS,
  samplePhysics1OnboardingQuestions,
} from "./physics-1";
import {
  ACADEMIC_PHYSICS_2_QUESTIONS,
  PHYSICS_2_QUESTIONS,
  samplePhysics2OnboardingQuestions,
} from "./physics-2";
import {
  ACADEMIC_PROB_QUESTIONS,
  PROBABILITY_STATISTICS_QUESTIONS,
  sampleProbabilityStatisticsOnboardingQuestions,
} from "./probability-statistics";
import {
  ACADEMIC_ODE_QUESTIONS,
  ORDINARY_DIFFERENTIAL_EQUATIONS_QUESTIONS,
  sampleODEOnboardingQuestions,
} from "./ordinary-differential-equations";
import {
  ACADEMIC_PDE_QUESTIONS,
  PDE_FOURIER_QUESTIONS,
  samplePDEOnboardingQuestions,
} from "./pde-fourier";
import {
  ACADEMIC_SIGNALS_SYSTEMS_QUESTIONS,
  SIGNALS_SYSTEMS_QUESTIONS,
  sampleSignalsSystemsOnboardingQuestions,
} from "./signals-systems";
import {
  ACADEMIC_COMPUTER_ARCHITECTURE_QUESTIONS,
  COMPUTER_ARCHITECTURE_QUESTIONS,
  sampleComputerArchitectureOnboardingQuestions,
} from "./computer-architecture";
import {
  ACADEMIC_MECHANICS_MATERIALS_QUESTIONS,
  MECHANICS_MATERIALS_QUESTIONS,
  sampleMechanicsMaterialsOnboardingQuestions,
} from "./mechanics-materials";
import {
  ACADEMIC_OPERATIONS_RESEARCH_QUESTIONS,
  OPERATIONS_RESEARCH_QUESTIONS,
  sampleOperationsResearchOnboardingQuestions,
} from "./operations-research";
import {
  ACADEMIC_DATABASES_QUESTIONS,
  DATABASES_QUESTIONS,
  sampleDatabasesOnboardingQuestions,
} from "./databases";
import {
  ACADEMIC_COMPUTER_NETWORKS_QUESTIONS,
  COMPUTER_NETWORKS_QUESTIONS,
  sampleComputerNetworksOnboardingQuestions,
} from "./computer-networks";
import {
  ACADEMIC_MACHINE_LEARNING_QUESTIONS,
  MACHINE_LEARNING_QUESTIONS,
  sampleMachineLearningOnboardingQuestions,
} from "./machine-learning";
import {
  ACADEMIC_CONTROL_THEORY_QUESTIONS,
  CONTROL_THEORY_QUESTIONS,
  sampleControlTheoryOnboardingQuestions,
} from "./control-theory";
import {
  ACADEMIC_OOP_ADVANCED_QUESTIONS,
  OOP_ADVANCED_QUESTIONS,
  sampleOOPAdvancedOnboardingQuestions,
} from "./oop-advanced";
import {
  ACADEMIC_THERMODYNAMICS_QUESTIONS,
  THERMODYNAMICS_QUESTIONS,
  sampleThermodynamicsOnboardingQuestions,
} from "./thermodynamics";
import {
  ACADEMIC_SEMICONDUCTORS_QUESTIONS,
  SEMICONDUCTORS_QUESTIONS,
  sampleSemiconductorsOnboardingQuestions,
} from "./semiconductors";
import {
  ACADEMIC_FLUID_MECHANICS_QUESTIONS,
  FLUID_MECHANICS_QUESTIONS,
  sampleFluidMechanicsOnboardingQuestions,
} from "./fluid-mechanics";
import {
  ACADEMIC_COMPILERS_QUESTIONS,
  COMPILERS_QUESTIONS,
  sampleCompilersOnboardingQuestions,
} from "./compilers";
import {
  ACADEMIC_ELECTROMAGNETICS_QUESTIONS,
  ELECTROMAGNETICS_QUESTIONS,
  sampleElectromagneticsOnboardingQuestions,
} from "./electromagnetics";
import {
  ACADEMIC_INFORMATION_SECURITY_QUESTIONS,
  INFORMATION_SECURITY_QUESTIONS,
  sampleInformationSecurityOnboardingQuestions,
} from "./information-security";
import {
  ACADEMIC_ELECTRONIC_CIRCUITS_QUESTIONS,
  ELECTRONIC_CIRCUITS_QUESTIONS,
  sampleElectronicCircuitsOnboardingQuestions,
} from "./electronic-circuits";
import {
  ACADEMIC_ENERGY_CONVERSION_QUESTIONS,
  ENERGY_CONVERSION_QUESTIONS,
  sampleEnergyConversionOnboardingQuestions,
} from "./energy-conversion";
import {
  ACADEMIC_HEAT_MASS_TRANSFER_QUESTIONS,
  HEAT_MASS_TRANSFER_QUESTIONS,
  sampleHeatMassTransferOnboardingQuestions,
} from "./heat-mass-transfer";
import {
  ACADEMIC_APPLIED_REGRESSION_QUESTIONS,
  APPLIED_REGRESSION_QUESTIONS,
  sampleAppliedRegressionOnboardingQuestions,
} from "./applied-regression";
import {
  ACADEMIC_DEEP_LEARNING_QUESTIONS,
  DEEP_LEARNING_QUESTIONS,
  sampleDeepLearningOnboardingQuestions,
} from "./deep-learning";
import {
  ACADEMIC_KINEMATICS_DYNAMICS_QUESTIONS,
  KINEMATICS_DYNAMICS_QUESTIONS,
  sampleKinematicsDynamicsOnboardingQuestions,
} from "./kinematics-dynamics";
import {
  ACADEMIC_STOCHASTIC_MODELS_QUESTIONS,
  STOCHASTIC_MODELS_QUESTIONS,
  sampleStochasticModelsOnboardingQuestions,
} from "./stochastic-models";
import {
  ACADEMIC_MACHINE_DESIGN_QUESTIONS,
  MACHINE_DESIGN_QUESTIONS,
  sampleMachineDesignOnboardingQuestions,
} from "./machine-design";
import {
  ACADEMIC_PRODUCTION_PLANNING_QUESTIONS,
  PRODUCTION_PLANNING_QUESTIONS,
  sampleProductionPlanningOnboardingQuestions,
} from "./production-planning";
import {
  ACADEMIC_NONLINEAR_OPTIMIZATION_QUESTIONS,
  NONLINEAR_OPTIMIZATION_QUESTIONS,
  sampleNonlinearOptimizationOnboardingQuestions,
} from "./nonlinear-optimization";
import {
  ACADEMIC_BIG_DATA_ANALYTICS_QUESTIONS,
  BIG_DATA_ANALYTICS_QUESTIONS,
  sampleBigDataAnalyticsOnboardingQuestions,
} from "./big-data-analytics";
import {
  ACADEMIC_ADVANCED_MACHINE_LEARNING_QUESTIONS,
  ADVANCED_MACHINE_LEARNING_QUESTIONS,
  sampleAdvancedMachineLearningOnboardingQuestions,
} from "./advanced-machine-learning";
import {
  ACADEMIC_DATA_TEXT_MINING_QUESTIONS,
  DATA_TEXT_MINING_QUESTIONS,
  sampleDataTextMiningOnboardingQuestions,
} from "./data-text-mining";
import {
  ACADEMIC_ADVANCED_DATABASES_NOSQL_QUESTIONS,
  ADVANCED_DATABASES_NOSQL_QUESTIONS,
  sampleAdvancedDatabasesNoSQLOnboardingQuestions,
} from "./advanced-databases-nosql";
import {
  ACADEMIC_SYSTEMS_ANALYSIS_ARCHITECTURE_QUESTIONS,
  SYSTEMS_ANALYSIS_ARCHITECTURE_QUESTIONS,
  sampleSystemsAnalysisArchitectureOnboardingQuestions,
} from "./systems-analysis-architecture";
import {
  ACADEMIC_SIMULATION_SYSTEMS_QUESTIONS,
  SIMULATION_SYSTEMS_QUESTIONS,
  sampleSimulationSystemsOnboardingQuestions,
} from "./simulation-systems";
import {
  ACADEMIC_UI_UX_ENGINEERING_QUESTIONS,
  UI_UX_ENGINEERING_QUESTIONS,
  sampleUIUXEngineeringOnboardingQuestions,
} from "./ui-ux-engineering";
import {
  ACADEMIC_ENGINEERING_ECONOMY_QUESTIONS,
  ENGINEERING_ECONOMY_QUESTIONS,
  sampleEngineeringEconomyOnboardingQuestions,
} from "./engineering-economy";
import {
  ACADEMIC_QUALITY_ENGINEERING_QUESTIONS,
  QUALITY_ENGINEERING_QUESTIONS,
  sampleQualityEngineeringOnboardingQuestions,
} from "./quality-engineering";
import {
  ACADEMIC_METHODS_ENGINEERING_ERGONOMICS_QUESTIONS,
  METHODS_ENGINEERING_ERGONOMICS_QUESTIONS,
  sampleMethodsEngineeringErgonomicsOnboardingQuestions,
} from "./methods-engineering-ergonomics";
import {
  ACADEMIC_IS_SECURITY_RISK_MANAGEMENT_QUESTIONS,
  IS_SECURITY_RISK_MANAGEMENT_QUESTIONS,
  sampleISSecurityRiskManagementOnboardingQuestions,
} from "./is-security-risk-management";
import {
  ACADEMIC_STRUCTURAL_STATICS_QUESTIONS,
  STRUCTURAL_STATICS_QUESTIONS,
  sampleStructuralStaticsOnboardingQuestions,
} from "./structural-statics";
import {
  ACADEMIC_DIGITAL_LOGIC_QUESTIONS,
  DIGITAL_LOGIC_QUESTIONS,
  sampleDigitalLogicOnboardingQuestions,
} from "./digital-logic";
import {
  ACADEMIC_DISTRIBUTED_SYSTEMS_QUESTIONS,
  DISTRIBUTED_SYSTEMS_QUESTIONS,
  sampleDistributedSystemsOnboardingQuestions,
} from "./distributed-systems";
import {
  ACADEMIC_COMPUTER_VISION_QUESTIONS,
  COMPUTER_VISION_QUESTIONS,
  sampleComputerVisionOnboardingQuestions,
} from "./computer-vision";
import {
  ACADEMIC_THEORY_COMPUTATION_COMPLEXITY_QUESTIONS,
  THEORY_COMPUTATION_COMPLEXITY_QUESTIONS,
  sampleTheoryComputationComplexityOnboardingQuestions,
} from "./theory-computation-complexity";
import {
  complexFunctionsQuestions,
  sampleComplexFunctionsOnboardingQuestions,
} from "./complex-functions";
import {
  digitalCommunicationsQuestions,
  sampleDigitalCommunicationsOnboardingQuestions,
} from "./digital-communications";
import {
  ACADEMIC_GENERAL_CHEMISTRY_QUESTIONS,
  GENERAL_CHEMISTRY_QUESTIONS,
  sampleGeneralChemistryOnboardingQuestions,
} from "./general-chemistry";
import {
  ACADEMIC_CAD_QUESTIONS,
  CAD_MECHANICAL_DESIGN_QUESTIONS,
  sampleCadMechanicalDesignOnboardingQuestions,
} from "./cad-mechanical-design";
import {
  ACADEMIC_MATERIALS_SCIENCE_QUESTIONS,
  MATERIALS_SCIENCE_QUESTIONS,
  sampleMaterialsScienceOnboardingQuestions,
} from "./materials-science";
import {
  ACADEMIC_MECHANICAL_VIBRATIONS_QUESTIONS,
  MECHANICAL_VIBRATIONS_QUESTIONS,
  sampleMechanicalVibrationsOnboardingQuestions,
} from "./mechanical-vibrations";
import {
  ACADEMIC_FEM_QUESTIONS,
  FINITE_ELEMENT_METHOD_QUESTIONS,
  sampleFemOnboardingQuestions,
} from "./finite-element-method";
import {
  ACADEMIC_DIGITAL_CONTROL_ROBOTICS_QUESTIONS,
  DIGITAL_CONTROL_ROBOTICS_QUESTIONS,
  sampleDigitalControlRoboticsOnboardingQuestions,
} from "./digital-control-robotics";
import {
  ACADEMIC_PYTHON_QUESTIONS,
  PYTHON_PROGRAMMING_QUESTIONS,
  samplePythonProgrammingOnboardingQuestions,
} from "./python-programming";
import {
  ACADEMIC_ORGANIZATION_THEORY_QUESTIONS,
  ORGANIZATION_THEORY_QUESTIONS,
  sampleOrganizationTheoryOnboardingQuestions,
} from "./organization-theory";
import {
  ACADEMIC_SUPPLY_CHAIN_QUESTIONS,
  SUPPLY_CHAIN_MANAGEMENT_QUESTIONS,
  sampleSupplyChainOnboardingQuestions,
} from "./supply-chain-management";
import {
  ACADEMIC_GAME_THEORY_QUESTIONS,
  GAME_THEORY_QUESTIONS,
  sampleGameTheoryOnboardingQuestions,
} from "./game-theory";
import {
  ACADEMIC_PLANT_LAYOUT_QUESTIONS,
  PLANT_LAYOUT_DESIGN_QUESTIONS,
  samplePlantLayoutOnboardingQuestions,
} from "./plant-layout-design";
import {
  ACADEMIC_BI_QUESTIONS,
  BUSINESS_INTELLIGENCE_QUESTIONS,
  sampleBusinessIntelligenceOnboardingQuestions,
} from "./business-intelligence";
import {
  ACADEMIC_INTRO_DS_QUESTIONS,
  INTRO_DATA_SCIENCE_QUESTIONS,
  sampleIntroDataScienceOnboardingQuestions,
} from "./intro-data-science";
import {
  ACADEMIC_NLP_QUESTIONS,
  NLP_LANGUAGE_PROCESSING_QUESTIONS,
  sampleNlpOnboardingQuestions,
} from "./nlp-language-processing";

export type {
  AcademicDegreeId,
  AcademicCourseKey,
  AcademicCourseMeta,
  AcademicDiagnosticQuestion,
  AcademicQuestionTag,
  DiagnosticQuestion,
} from "./types";

/** Fisher–Yates — new array, source untouched. */
function shuffleQuestions(
  pool: AcademicDiagnosticQuestion[]
): AcademicDiagnosticQuestion[] {
  const copy = [...pool];
  for (let i = copy.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [copy[i], copy[j]] = [copy[j], copy[i]];
  }
  return copy;
}

/**
 * Stratified sample of exactly 3 questions from a 12-question academic bank:
 * one from each tercile (core topic strata), then shuffle.
 * Fail-closed: empty / undersized bank → [].
 */
export function sampleAcademicStratified(
  bank: readonly AcademicDiagnosticQuestion[],
  count = 3
): AcademicDiagnosticQuestion[] {
  if (bank.length === 0) return [];
  if (bank.length < count) return [];

  const strataCount = count;
  const strataSize = Math.floor(bank.length / strataCount);
  const selected: AcademicDiagnosticQuestion[] = [];

  for (let s = 0; s < strataCount; s++) {
    const start = s * strataSize;
    const end = s === strataCount - 1 ? bank.length : start + strataSize;
    const pool = bank.slice(start, end);
    if (pool.length === 0) return [];
    const pick = shuffleQuestions(pool)[0];
    if (pick) selected.push(pick);
  }

  if (selected.length !== count) return [];
  return shuffleQuestions(selected);
}

export function sampleAcademicCalcQuestions(): AcademicDiagnosticQuestion[] {
  return sampleCalculusOnboardingQuestions();
}

export function sampleAcademicCalc2Questions(): AcademicDiagnosticQuestion[] {
  return sampleCalculus2OnboardingQuestions();
}

export function sampleAcademicLinAlgQuestions(): AcademicDiagnosticQuestion[] {
  return sampleLinearAlgebra1OnboardingQuestions();
}

export function sampleAcademicLinAlg2Questions(): AcademicDiagnosticQuestion[] {
  return sampleLinearAlgebra2OnboardingQuestions();
}

function toAcademicCsQuestion(q: DiagnosticQuestion): AcademicDiagnosticQuestion {
  return {
    id: q.id,
    domain: "מבני נתונים",
    title: q.title,
    context: "",
    instruction: q.stem,
    options: q.options.map((opt, i) => ({
      id: String(i + 1),
      plainText: opt.text,
      isCorrect: i === q.correctIndex,
      explanation: opt.explanation,
    })),
  };
}

export const ACADEMIC_CS_QUESTIONS: AcademicDiagnosticQuestion[] =
  csDataStructuresQuestions.map(toAcademicCsQuestion);

export function sampleAcademicCsQuestions(): AcademicDiagnosticQuestion[] {
  return sampleCsDataStructuresOnboardingQuestions().map(toAcademicCsQuestion);
}

export function sampleAcademicDiscreteMathQuestions(): AcademicDiagnosticQuestion[] {
  return sampleDiscreteMathOnboardingQuestions();
}

export function sampleAcademicIntroCsQuestions(): AcademicDiagnosticQuestion[] {
  return sampleIntroCSOnboardingQuestions();
}

export function sampleAcademicAlgorithmsQuestions(): AcademicDiagnosticQuestion[] {
  return sampleAlgorithmsOnboardingQuestions();
}

export function sampleAcademicOperatingSystemsQuestions(): AcademicDiagnosticQuestion[] {
  return sampleOperatingSystemsOnboardingQuestions();
}

export function sampleAcademicAutomataQuestions(): AcademicDiagnosticQuestion[] {
  return sampleAutomataOnboardingQuestions();
}

export function sampleAcademicCircuitsQuestions(): AcademicDiagnosticQuestion[] {
  return sampleCircuitsOnboardingQuestions();
}

export function sampleAcademicPhysics1Questions(): AcademicDiagnosticQuestion[] {
  return samplePhysics1OnboardingQuestions();
}

export function sampleAcademicPhysics2Questions(): AcademicDiagnosticQuestion[] {
  return samplePhysics2OnboardingQuestions();
}

export function sampleAcademicProbQuestions(): AcademicDiagnosticQuestion[] {
  return sampleProbabilityStatisticsOnboardingQuestions();
}

export function sampleAcademicOdeQuestions(): AcademicDiagnosticQuestion[] {
  return sampleODEOnboardingQuestions();
}

export function sampleAcademicPdeQuestions(): AcademicDiagnosticQuestion[] {
  return samplePDEOnboardingQuestions();
}

export function sampleAcademicSignalsSystemsQuestions(): AcademicDiagnosticQuestion[] {
  return sampleSignalsSystemsOnboardingQuestions();
}

export function sampleAcademicComputerArchitectureQuestions(): AcademicDiagnosticQuestion[] {
  return sampleComputerArchitectureOnboardingQuestions();
}

export function sampleAcademicMechanicsMaterialsQuestions(): AcademicDiagnosticQuestion[] {
  return sampleMechanicsMaterialsOnboardingQuestions();
}

export function sampleAcademicOperationsResearchQuestions(): AcademicDiagnosticQuestion[] {
  return sampleOperationsResearchOnboardingQuestions();
}

export function sampleAcademicDatabasesQuestions(): AcademicDiagnosticQuestion[] {
  return sampleDatabasesOnboardingQuestions();
}

export function sampleAcademicComputerNetworksQuestions(): AcademicDiagnosticQuestion[] {
  return sampleComputerNetworksOnboardingQuestions();
}

export function sampleAcademicMachineLearningQuestions(): AcademicDiagnosticQuestion[] {
  return sampleMachineLearningOnboardingQuestions();
}

export function sampleAcademicControlTheoryQuestions(): AcademicDiagnosticQuestion[] {
  return sampleControlTheoryOnboardingQuestions();
}

export function sampleAcademicOOPAdvancedQuestions(): AcademicDiagnosticQuestion[] {
  return sampleOOPAdvancedOnboardingQuestions();
}

export function sampleAcademicThermodynamicsQuestions(): AcademicDiagnosticQuestion[] {
  return sampleThermodynamicsOnboardingQuestions();
}

export function sampleAcademicSemiconductorsQuestions(): AcademicDiagnosticQuestion[] {
  return sampleSemiconductorsOnboardingQuestions();
}

export function sampleAcademicFluidMechanicsQuestions(): AcademicDiagnosticQuestion[] {
  return sampleFluidMechanicsOnboardingQuestions();
}

export function sampleAcademicCompilersQuestions(): AcademicDiagnosticQuestion[] {
  return sampleCompilersOnboardingQuestions();
}

export function sampleAcademicElectromagneticsQuestions(): AcademicDiagnosticQuestion[] {
  return sampleElectromagneticsOnboardingQuestions();
}

export function sampleAcademicInformationSecurityQuestions(): AcademicDiagnosticQuestion[] {
  return sampleInformationSecurityOnboardingQuestions();
}

export function sampleAcademicElectronicCircuitsQuestions(): AcademicDiagnosticQuestion[] {
  return sampleElectronicCircuitsOnboardingQuestions();
}

export function sampleAcademicEnergyConversionQuestions(): AcademicDiagnosticQuestion[] {
  return sampleEnergyConversionOnboardingQuestions();
}

export function sampleAcademicHeatMassTransferQuestions(): AcademicDiagnosticQuestion[] {
  return sampleHeatMassTransferOnboardingQuestions();
}

export function sampleAcademicAppliedRegressionQuestions(): AcademicDiagnosticQuestion[] {
  return sampleAppliedRegressionOnboardingQuestions();
}

export function sampleAcademicDeepLearningQuestions(): AcademicDiagnosticQuestion[] {
  return sampleDeepLearningOnboardingQuestions();
}

export function sampleAcademicKinematicsDynamicsQuestions(): AcademicDiagnosticQuestion[] {
  return sampleKinematicsDynamicsOnboardingQuestions();
}

export function sampleAcademicStochasticModelsQuestions(): AcademicDiagnosticQuestion[] {
  return sampleStochasticModelsOnboardingQuestions();
}

export function sampleAcademicMachineDesignQuestions(): AcademicDiagnosticQuestion[] {
  return sampleMachineDesignOnboardingQuestions();
}

export function sampleAcademicProductionPlanningQuestions(): AcademicDiagnosticQuestion[] {
  return sampleProductionPlanningOnboardingQuestions();
}

export function sampleAcademicNonlinearOptimizationQuestions(): AcademicDiagnosticQuestion[] {
  return sampleNonlinearOptimizationOnboardingQuestions();
}

export function sampleAcademicBigDataAnalyticsQuestions(): AcademicDiagnosticQuestion[] {
  return sampleBigDataAnalyticsOnboardingQuestions();
}

export function sampleAcademicAdvancedMachineLearningQuestions(): AcademicDiagnosticQuestion[] {
  return sampleAdvancedMachineLearningOnboardingQuestions();
}

export function sampleAcademicDataTextMiningQuestions(): AcademicDiagnosticQuestion[] {
  return sampleDataTextMiningOnboardingQuestions();
}

export function sampleAcademicAdvancedDatabasesNoSQLQuestions(): AcademicDiagnosticQuestion[] {
  return sampleAdvancedDatabasesNoSQLOnboardingQuestions();
}

export function sampleAcademicSystemsAnalysisArchitectureQuestions(): AcademicDiagnosticQuestion[] {
  return sampleSystemsAnalysisArchitectureOnboardingQuestions();
}

export function sampleAcademicSimulationSystemsQuestions(): AcademicDiagnosticQuestion[] {
  return sampleSimulationSystemsOnboardingQuestions();
}

export function sampleAcademicUIUXEngineeringQuestions(): AcademicDiagnosticQuestion[] {
  return sampleUIUXEngineeringOnboardingQuestions();
}

export function sampleAcademicEngineeringEconomyQuestions(): AcademicDiagnosticQuestion[] {
  return sampleEngineeringEconomyOnboardingQuestions();
}

export function sampleAcademicQualityEngineeringQuestions(): AcademicDiagnosticQuestion[] {
  return sampleQualityEngineeringOnboardingQuestions();
}

export function sampleAcademicMethodsErgonomicsQuestions(): AcademicDiagnosticQuestion[] {
  return sampleMethodsEngineeringErgonomicsOnboardingQuestions();
}

export function sampleAcademicISSecurityRiskQuestions(): AcademicDiagnosticQuestion[] {
  return sampleISSecurityRiskManagementOnboardingQuestions();
}

export function sampleAcademicStructuralStaticsQuestions(): AcademicDiagnosticQuestion[] {
  return sampleStructuralStaticsOnboardingQuestions();
}

export function sampleAcademicDigitalLogicQuestions(): AcademicDiagnosticQuestion[] {
  return sampleDigitalLogicOnboardingQuestions();
}

export function sampleAcademicDistributedSystemsQuestions(): AcademicDiagnosticQuestion[] {
  return sampleDistributedSystemsOnboardingQuestions();
}

export function sampleAcademicComputerVisionQuestions(): AcademicDiagnosticQuestion[] {
  return sampleComputerVisionOnboardingQuestions();
}

export function sampleAcademicTheoryComputationComplexityQuestions(): AcademicDiagnosticQuestion[] {
  return sampleTheoryComputationComplexityOnboardingQuestions();
}

function toAcademicComplexFunctionsQuestion(
  q: DiagnosticQuestion
): AcademicDiagnosticQuestion {
  return {
    id: q.id,
    domain: "פונקציות מרוכבות והתמרות אינטגרליות",
    title: q.title,
    context: "",
    instruction: q.stem,
    options: q.options.map((opt, i) => ({
      id: String(i + 1),
      plainText: opt.text,
      isCorrect: i === q.correctIndex,
      explanation: opt.explanation,
    })),
  };
}

export const COMPLEX_FUNCTIONS_QUESTIONS: AcademicDiagnosticQuestion[] =
  complexFunctionsQuestions.map(toAcademicComplexFunctionsQuestion);

export const ACADEMIC_COMPLEX_FUNCTIONS_QUESTIONS = COMPLEX_FUNCTIONS_QUESTIONS;

export function sampleAcademicComplexFunctionsQuestions(): AcademicDiagnosticQuestion[] {
  return sampleComplexFunctionsOnboardingQuestions().map(
    toAcademicComplexFunctionsQuestion
  );
}

function toAcademicDigitalCommunicationsQuestion(
  q: DiagnosticQuestion
): AcademicDiagnosticQuestion {
  return {
    id: q.id,
    domain: "תקשורת ספרתית",
    title: q.title,
    context: "",
    instruction: q.stem,
    options: q.options.map((opt, i) => ({
      id: String(i + 1),
      plainText: opt.text,
      isCorrect: i === q.correctIndex,
      explanation: opt.explanation,
    })),
  };
}

export const DIGITAL_COMMUNICATIONS_QUESTIONS: AcademicDiagnosticQuestion[] =
  digitalCommunicationsQuestions.map(toAcademicDigitalCommunicationsQuestion);

export const ACADEMIC_DIGITAL_COMMUNICATIONS_QUESTIONS =
  DIGITAL_COMMUNICATIONS_QUESTIONS;

export function sampleAcademicDigitalCommunicationsQuestions(): AcademicDiagnosticQuestion[] {
  return sampleDigitalCommunicationsOnboardingQuestions().map(
    toAcademicDigitalCommunicationsQuestion
  );
}

export const ACADEMIC_COURSES: readonly AcademicCourseMeta[] = [
  {
    id: "academic-calculus",
    degreeId: "exact-sciences",
    nameHe: "חדו״א / אינפי",
    questionBank: ACADEMIC_CALC_QUESTIONS,
    sampleFunction: sampleAcademicCalcQuestions,
  },
  {
    id: "academic-calculus-2",
    degreeId: "exact-sciences",
    nameHe: "חדו״א 2 / אינפי 2",
    questionBank: ACADEMIC_CALC2_QUESTIONS,
    sampleFunction: sampleAcademicCalc2Questions,
  },
  {
    id: "academic-linear-algebra-1",
    degreeId: "exact-sciences",
    nameHe: "אלגברה ליניארית 1",
    questionBank: ACADEMIC_LINALG_QUESTIONS,
    sampleFunction: sampleAcademicLinAlgQuestions,
  },
  {
    id: "academic-linear-algebra-2",
    degreeId: "exact-sciences",
    nameHe: "אלגברה ליניארית 2",
    questionBank: ACADEMIC_LINALG2_QUESTIONS,
    sampleFunction: sampleAcademicLinAlg2Questions,
  },
  {
    id: "cs-data-structures",
    degreeId: "computer-science",
    nameHe: "מבני נתונים",
    questionBank: ACADEMIC_CS_QUESTIONS,
    sampleFunction: sampleAcademicCsQuestions,
  },
  {
    id: "academic-discrete-math",
    degreeId: "computer-science",
    nameHe: "מתמטיקה בדידה",
    questionBank: ACADEMIC_DISCRETE_MATH_QUESTIONS,
    sampleFunction: sampleAcademicDiscreteMathQuestions,
  },
  {
    id: "academic-intro-cs",
    degreeId: "computer-science",
    nameHe: "מבוא למדעי המחשב",
    questionBank: ACADEMIC_INTRO_CS_QUESTIONS,
    sampleFunction: sampleAcademicIntroCsQuestions,
  },
  {
    id: "academic-algorithms",
    degreeId: "computer-science",
    nameHe: "תכנון וניתוח אלגוריתמים",
    questionBank: ACADEMIC_ALGORITHMS_QUESTIONS,
    sampleFunction: sampleAcademicAlgorithmsQuestions,
  },
  {
    id: "academic-operating-systems",
    degreeId: "computer-science",
    nameHe: "מערכות הפעלה",
    questionBank: ACADEMIC_OPERATING_SYSTEMS_QUESTIONS,
    sampleFunction: sampleAcademicOperatingSystemsQuestions,
  },
  {
    id: "academic-automata",
    degreeId: "computer-science",
    nameHe: "מודלים חישוביים ואוטומטים",
    questionBank: ACADEMIC_AUTOMATA_QUESTIONS,
    sampleFunction: sampleAcademicAutomataQuestions,
  },
  {
    id: "academic-circuits",
    degreeId: "engineering",
    nameHe: "תורת המעגלים",
    questionBank: ACADEMIC_ELECTRIC_CIRCUITS_QUESTIONS,
    sampleFunction: sampleAcademicCircuitsQuestions,
  },
  {
    id: "academic-physics-1",
    degreeId: "engineering",
    nameHe: "פיזיקה 1 - מכניקה",
    questionBank: ACADEMIC_PHYSICS_1_QUESTIONS,
    sampleFunction: sampleAcademicPhysics1Questions,
  },
  {
    id: "academic-physics-2",
    degreeId: "engineering",
    nameHe: "פיזיקה 2 - חשמל ומגנטיות",
    questionBank: ACADEMIC_PHYSICS_2_QUESTIONS,
    sampleFunction: sampleAcademicPhysics2Questions,
  },
  {
    id: "academic-probability-statistics",
    degreeId: "exact-sciences",
    nameHe: "הסתברות וסטטיסטיקה",
    questionBank: ACADEMIC_PROB_QUESTIONS,
    sampleFunction: sampleAcademicProbQuestions,
  },
  {
    id: "academic-ordinary-differential-equations",
    degreeId: "exact-sciences",
    nameHe: "משוואות דיפרנציאליות רגילות",
    questionBank: ACADEMIC_ODE_QUESTIONS,
    sampleFunction: sampleAcademicOdeQuestions,
  },
  {
    id: "academic-pde-fourier",
    degreeId: "exact-sciences",
    nameHe: "משוואות דיפרנציאליות חלקיות וטורי פורייה",
    questionBank: ACADEMIC_PDE_QUESTIONS,
    sampleFunction: sampleAcademicPdeQuestions,
  },
  {
    id: "academic-signals-systems",
    degreeId: "engineering",
    nameHe: "אותות ומערכות",
    questionBank: ACADEMIC_SIGNALS_SYSTEMS_QUESTIONS,
    sampleFunction: sampleAcademicSignalsSystemsQuestions,
  },
  {
    id: "academic-computer-architecture",
    degreeId: "computer-science",
    nameHe: "מבנה מחשבים וארכיטקטורה",
    questionBank: ACADEMIC_COMPUTER_ARCHITECTURE_QUESTIONS,
    sampleFunction: sampleAcademicComputerArchitectureQuestions,
  },
  {
    id: "academic-mechanics-materials",
    degreeId: "engineering",
    nameHe: "סטטיקה וחוזק חומרים",
    questionBank: ACADEMIC_MECHANICS_MATERIALS_QUESTIONS,
    sampleFunction: sampleAcademicMechanicsMaterialsQuestions,
  },
  {
    id: "academic-operations-research",
    degreeId: "engineering",
    nameHe: "חקר ביצועים",
    questionBank: ACADEMIC_OPERATIONS_RESEARCH_QUESTIONS,
    sampleFunction: sampleAcademicOperationsResearchQuestions,
  },
  {
    id: "academic-databases",
    degreeId: "computer-science",
    nameHe: "בסיסי נתונים",
    questionBank: ACADEMIC_DATABASES_QUESTIONS,
    sampleFunction: sampleAcademicDatabasesQuestions,
  },
  {
    id: "academic-computer-networks",
    degreeId: "computer-science",
    nameHe: "רשתות תקשורת מחשבים",
    questionBank: ACADEMIC_COMPUTER_NETWORKS_QUESTIONS,
    sampleFunction: sampleAcademicComputerNetworksQuestions,
  },
  {
    id: "academic-machine-learning",
    degreeId: "computer-science",
    nameHe: "מבוא ללמידת מכונה",
    questionBank: ACADEMIC_MACHINE_LEARNING_QUESTIONS,
    sampleFunction: sampleAcademicMachineLearningQuestions,
  },
  {
    id: "academic-control-theory",
    degreeId: "engineering",
    nameHe: "תורת הבקרה ומערכות ליניאריות",
    questionBank: ACADEMIC_CONTROL_THEORY_QUESTIONS,
    sampleFunction: sampleAcademicControlTheoryQuestions,
  },
  {
    id: "academic-oop",
    degreeId: "computer-science",
    nameHe: "תכנות מונחה עצמים ומתקדם",
    questionBank: ACADEMIC_OOP_ADVANCED_QUESTIONS,
    sampleFunction: sampleAcademicOOPAdvancedQuestions,
  },
  {
    id: "academic-thermodynamics",
    degreeId: "engineering",
    nameHe: "תרמודינמיקה הנדסית",
    questionBank: ACADEMIC_THERMODYNAMICS_QUESTIONS,
    sampleFunction: sampleAcademicThermodynamicsQuestions,
  },
  {
    id: "academic-semiconductors",
    degreeId: "engineering",
    nameHe: "התקני מוליכים למחצה",
    questionBank: ACADEMIC_SEMICONDUCTORS_QUESTIONS,
    sampleFunction: sampleAcademicSemiconductorsQuestions,
  },
  {
    id: "academic-fluid-mechanics",
    degreeId: "engineering",
    nameHe: "מכניקת זורמים",
    questionBank: ACADEMIC_FLUID_MECHANICS_QUESTIONS,
    sampleFunction: sampleAcademicFluidMechanicsQuestions,
  },
  {
    id: "academic-compilers",
    degreeId: "computer-science",
    nameHe: "קומפילציה ושפות תכנות",
    questionBank: ACADEMIC_COMPILERS_QUESTIONS,
    sampleFunction: sampleAcademicCompilersQuestions,
  },
  {
    id: "academic-electromagnetics",
    degreeId: "engineering",
    nameHe: "גלים ושדות אלקטרומגנטיים",
    questionBank: ACADEMIC_ELECTROMAGNETICS_QUESTIONS,
    sampleFunction: sampleAcademicElectromagneticsQuestions,
  },
  {
    id: "academic-information-security",
    degreeId: "computer-science",
    nameHe: "אבטחת מידע וקריפטוגרפיה",
    questionBank: ACADEMIC_INFORMATION_SECURITY_QUESTIONS,
    sampleFunction: sampleAcademicInformationSecurityQuestions,
  },
  {
    id: "academic-electronic-circuits",
    degreeId: "engineering",
    nameHe: "מעגלים אלקטרוניים אנלוגיים וספרתיים",
    questionBank: ACADEMIC_ELECTRONIC_CIRCUITS_QUESTIONS,
    sampleFunction: sampleAcademicElectronicCircuitsQuestions,
  },
  {
    id: "academic-energy-conversion",
    degreeId: "engineering",
    nameHe: "המרת אנרגיה ומערכות הספק",
    questionBank: ACADEMIC_ENERGY_CONVERSION_QUESTIONS,
    sampleFunction: sampleAcademicEnergyConversionQuestions,
  },
  {
    id: "academic-heat-mass-transfer",
    degreeId: "engineering",
    nameHe: "מעבר חום ומעבר מסה",
    questionBank: ACADEMIC_HEAT_MASS_TRANSFER_QUESTIONS,
    sampleFunction: sampleAcademicHeatMassTransferQuestions,
  },
  {
    id: "academic-applied-regression",
    degreeId: "exact-sciences",
    nameHe: "מודלים סטטיסטיים ורגרסיה ליניארית ומיושמת",
    questionBank: ACADEMIC_APPLIED_REGRESSION_QUESTIONS,
    sampleFunction: sampleAppliedRegressionOnboardingQuestions,
  },
  {
    id: "academic-deep-learning",
    degreeId: "computer-science",
    nameHe: "למידה עמוקה",
    questionBank: ACADEMIC_DEEP_LEARNING_QUESTIONS,
    sampleFunction: sampleDeepLearningOnboardingQuestions,
  },
  {
    id: "academic-kinematics-dynamics",
    degreeId: "engineering",
    nameHe: "קינמטיקה ודינמיקה של גופים ומנגנונים",
    questionBank: ACADEMIC_KINEMATICS_DYNAMICS_QUESTIONS,
    sampleFunction: sampleKinematicsDynamicsOnboardingQuestions,
  },
  {
    id: "academic-stochastic-models",
    degreeId: "engineering",
    nameHe: "חקר ביצועים 2 (מודלים סטוכסטיים ותורת התורים)",
    questionBank: ACADEMIC_STOCHASTIC_MODELS_QUESTIONS,
    sampleFunction: sampleStochasticModelsOnboardingQuestions,
  },
  {
    id: "academic-machine-design",
    degreeId: "engineering",
    nameHe: "תכן מכני",
    questionBank: ACADEMIC_MACHINE_DESIGN_QUESTIONS,
    sampleFunction: sampleMachineDesignOnboardingQuestions,
  },
  {
    id: "academic-production-planning",
    degreeId: "engineering",
    nameHe: "תכנון ופיקוח הייצור (תפ״י)",
    questionBank: ACADEMIC_PRODUCTION_PLANNING_QUESTIONS,
    sampleFunction: sampleProductionPlanningOnboardingQuestions,
  },
  {
    id: "academic-nonlinear-optimization",
    degreeId: "engineering",
    nameHe: "אופטימיזציה רציפה ולא-ליניארית",
    questionBank: ACADEMIC_NONLINEAR_OPTIMIZATION_QUESTIONS,
    sampleFunction: sampleNonlinearOptimizationOnboardingQuestions,
  },
  {
    id: "academic-big-data",
    degreeId: "computer-science",
    nameHe: "אלגוריתמים לנתוני עתק (Big Data)",
    questionBank: ACADEMIC_BIG_DATA_ANALYTICS_QUESTIONS,
    sampleFunction: sampleBigDataAnalyticsOnboardingQuestions,
  },
  {
    id: "academic-advanced-ml",
    degreeId: "computer-science",
    nameHe: "למידת מכונה מתקדמת",
    questionBank: ACADEMIC_ADVANCED_MACHINE_LEARNING_QUESTIONS,
    sampleFunction: sampleAdvancedMachineLearningOnboardingQuestions,
  },
  {
    id: "academic-data-text-mining",
    degreeId: "computer-science",
    nameHe: "כריית נתונים וטקסט",
    questionBank: ACADEMIC_DATA_TEXT_MINING_QUESTIONS,
    sampleFunction: sampleDataTextMiningOnboardingQuestions,
  },
  {
    id: "academic-advanced-databases",
    degreeId: "computer-science",
    nameHe: "בסיסי נתונים מתקדמים ומערכות NoSQL",
    questionBank: ACADEMIC_ADVANCED_DATABASES_NOSQL_QUESTIONS,
    sampleFunction: sampleAdvancedDatabasesNoSQLOnboardingQuestions,
  },
  {
    id: "academic-systems-analysis",
    degreeId: "computer-science",
    nameHe: "ניתוח, תכן וארכיטקטורת מערכות מידע",
    questionBank: ACADEMIC_SYSTEMS_ANALYSIS_ARCHITECTURE_QUESTIONS,
    sampleFunction: sampleSystemsAnalysisArchitectureOnboardingQuestions,
  },
  {
    id: "academic-simulation-systems",
    degreeId: "engineering",
    nameHe: "סימולציה של מערכות ייצור ושירות",
    questionBank: ACADEMIC_SIMULATION_SYSTEMS_QUESTIONS,
    sampleFunction: sampleSimulationSystemsOnboardingQuestions,
  },
  {
    id: "academic-ui-ux-engineering",
    degreeId: "computer-science",
    nameHe: "הנדסת דרישות וממשקי משתמש (UI/UX)",
    questionBank: ACADEMIC_UI_UX_ENGINEERING_QUESTIONS,
    sampleFunction: sampleUIUXEngineeringOnboardingQuestions,
  },
  {
    id: "academic-engineering-economy",
    degreeId: "engineering",
    nameHe: "תמחור ובקרת עלויות הנדסית",
    questionBank: ACADEMIC_ENGINEERING_ECONOMY_QUESTIONS,
    sampleFunction: sampleEngineeringEconomyOnboardingQuestions,
  },
  {
    id: "academic-quality-engineering",
    degreeId: "engineering",
    nameHe: "ניהול איכות ושיטות שש-סיגמא",
    questionBank: ACADEMIC_QUALITY_ENGINEERING_QUESTIONS,
    sampleFunction: sampleQualityEngineeringOnboardingQuestions,
  },
  {
    id: "academic-methods-ergonomics",
    degreeId: "engineering",
    nameHe: "הנדסת שיטות וארגונומיה",
    questionBank: ACADEMIC_METHODS_ENGINEERING_ERGONOMICS_QUESTIONS,
    sampleFunction: sampleMethodsEngineeringErgonomicsOnboardingQuestions,
  },
  {
    id: "academic-is-security-risk",
    degreeId: "computer-science",
    nameHe: "אבטחת מערכות מידע וניהול סיכונים",
    questionBank: ACADEMIC_IS_SECURITY_RISK_MANAGEMENT_QUESTIONS,
    sampleFunction: sampleISSecurityRiskManagementOnboardingQuestions,
  },
  {
    id: "academic-structural-statics",
    degreeId: "engineering",
    nameHe: "סטטיקה של מבנים",
    questionBank: ACADEMIC_STRUCTURAL_STATICS_QUESTIONS,
    sampleFunction: sampleStructuralStaticsOnboardingQuestions,
  },
  {
    id: "academic-digital-logic",
    degreeId: "computer-science",
    nameHe: "מערכות ספרתיות ותכן לוגי",
    questionBank: ACADEMIC_DIGITAL_LOGIC_QUESTIONS,
    sampleFunction: sampleDigitalLogicOnboardingQuestions,
  },
  {
    id: "academic-distributed-systems",
    degreeId: "computer-science",
    nameHe: "מערכות מבוזרות ומחשוב ענן",
    questionBank: ACADEMIC_DISTRIBUTED_SYSTEMS_QUESTIONS,
    sampleFunction: sampleDistributedSystemsOnboardingQuestions,
  },
  {
    id: "academic-computer-vision",
    degreeId: "computer-science",
    nameHe: "ראייה ממוחשבת ועיבוד תמונה",
    questionBank: ACADEMIC_COMPUTER_VISION_QUESTIONS,
    sampleFunction: sampleComputerVisionOnboardingQuestions,
  },
  {
    id: "academic-theory-computation",
    degreeId: "computer-science",
    nameHe: "תורת החישוב וסיבוכיות",
    questionBank: ACADEMIC_THEORY_COMPUTATION_COMPLEXITY_QUESTIONS,
    sampleFunction: sampleAcademicTheoryComputationComplexityQuestions,
  },
  {
    id: "academic-complex-functions",
    degreeId: "engineering",
    nameHe: "פונקציות מרוכבות והתמרות אינטגרליות",
    questionBank: ACADEMIC_COMPLEX_FUNCTIONS_QUESTIONS,
    sampleFunction: sampleAcademicComplexFunctionsQuestions,
  },
  {
    id: "academic-digital-communications",
    degreeId: "engineering",
    nameHe: "תקשורת ספרתית",
    questionBank: ACADEMIC_DIGITAL_COMMUNICATIONS_QUESTIONS,
    sampleFunction: sampleAcademicDigitalCommunicationsQuestions,
  },
  {
    id: "academic-general-chemistry",
    degreeId: "engineering",
    nameHe: "כימיה כללית",
    questionBank: ACADEMIC_GENERAL_CHEMISTRY_QUESTIONS,
    sampleFunction: sampleGeneralChemistryOnboardingQuestions,
  },
  {
    id: "academic-cad",
    degreeId: "engineering",
    nameHe: "גרפיקה הנדסית ותכן בעזרת מחשב",
    questionBank: ACADEMIC_CAD_QUESTIONS,
    sampleFunction: sampleCadMechanicalDesignOnboardingQuestions,
  },
  {
    id: "academic-materials-science",
    degreeId: "engineering",
    nameHe: "תורת החומרים",
    questionBank: ACADEMIC_MATERIALS_SCIENCE_QUESTIONS,
    sampleFunction: sampleMaterialsScienceOnboardingQuestions,
  },
  {
    id: "academic-mechanical-vibrations",
    degreeId: "engineering",
    nameHe: "תורת התנודות והרעידות",
    questionBank: ACADEMIC_MECHANICAL_VIBRATIONS_QUESTIONS,
    sampleFunction: sampleMechanicalVibrationsOnboardingQuestions,
  },
  {
    id: "academic-fem",
    degreeId: "engineering",
    nameHe: "אלמנטים סופיים - FEM",
    questionBank: ACADEMIC_FEM_QUESTIONS,
    sampleFunction: sampleFemOnboardingQuestions,
  },
  {
    id: "academic-digital-control-robotics",
    degreeId: "engineering",
    nameHe: "בקרה ספרתית ורובוטיקה",
    questionBank: ACADEMIC_DIGITAL_CONTROL_ROBOTICS_QUESTIONS,
    sampleFunction: sampleDigitalControlRoboticsOnboardingQuestions,
  },
  {
    id: "academic-python",
    degreeId: "engineering",
    nameHe: "עקרונות תכנות ופייתון",
    questionBank: ACADEMIC_PYTHON_QUESTIONS,
    sampleFunction: samplePythonProgrammingOnboardingQuestions,
  },
  {
    id: "academic-organization-theory",
    degreeId: "engineering",
    nameHe: "תורת הארגון והתנהגות ארגונית",
    questionBank: ACADEMIC_ORGANIZATION_THEORY_QUESTIONS,
    sampleFunction: sampleOrganizationTheoryOnboardingQuestions,
  },
  {
    id: "academic-supply-chain",
    degreeId: "engineering",
    nameHe: "שרשרת אספקה ולוגיסטיקה",
    questionBank: ACADEMIC_SUPPLY_CHAIN_QUESTIONS,
    sampleFunction: sampleSupplyChainOnboardingQuestions,
  },
  {
    id: "academic-game-theory",
    degreeId: "engineering",
    nameHe: "תורת המשחקים ומודלים כלכליים",
    questionBank: ACADEMIC_GAME_THEORY_QUESTIONS,
    sampleFunction: sampleGameTheoryOnboardingQuestions,
  },
  {
    id: "academic-plant-layout",
    degreeId: "engineering",
    nameHe: "תכנון מערכי מפעל ומתקנים",
    questionBank: ACADEMIC_PLANT_LAYOUT_QUESTIONS,
    sampleFunction: samplePlantLayoutOnboardingQuestions,
  },
  {
    id: "academic-bi",
    degreeId: "computer-science",
    nameHe: "בינה עסקית ומחסני נתונים (BI)",
    questionBank: ACADEMIC_BI_QUESTIONS,
    sampleFunction: sampleBusinessIntelligenceOnboardingQuestions,
  },
  {
    id: "academic-intro-ds",
    degreeId: "computer-science",
    nameHe: "מבוא למדעי הנתונים ופייתון",
    questionBank: ACADEMIC_INTRO_DS_QUESTIONS,
    sampleFunction: sampleIntroDataScienceOnboardingQuestions,
  },
  {
    id: "academic-nlp",
    degreeId: "computer-science",
    nameHe: "עיבוד שפה טבעית (NLP)",
    questionBank: ACADEMIC_NLP_QUESTIONS,
    sampleFunction: sampleNlpOnboardingQuestions,
  },
] as const;

export const ACADEMIC_COURSE_DISPATCH: Readonly<
  Record<AcademicCourseKey, () => AcademicDiagnosticQuestion[]> & {
    "cs-data-structures": typeof sampleCsDataStructuresOnboardingQuestions;
    "academic-complex-functions": typeof sampleComplexFunctionsOnboardingQuestions;
    "academic-digital-communications": typeof sampleDigitalCommunicationsOnboardingQuestions;
  }
> = {
  CALC: sampleAcademicCalcQuestions,
  CALC2: sampleAcademicCalc2Questions,
  LINALG: sampleAcademicLinAlgQuestions,
  LINALG2: sampleAcademicLinAlg2Questions,
  CS: sampleAcademicCsQuestions,
  "cs-data-structures": sampleCsDataStructuresOnboardingQuestions,
  DISCRETE: sampleAcademicDiscreteMathQuestions,
  INTRO_CS: sampleAcademicIntroCsQuestions,
  ALGORITHMS: sampleAcademicAlgorithmsQuestions,
  OPERATING_SYSTEMS: sampleAcademicOperatingSystemsQuestions,
  AUTOMATA: sampleAcademicAutomataQuestions,
  PHYSICS1: sampleAcademicPhysics1Questions,
  PHYSICS2: sampleAcademicPhysics2Questions,
  PROB: sampleAcademicProbQuestions,
  ODE: sampleAcademicOdeQuestions,
  PDE: sampleAcademicPdeQuestions,
  CIRCUITS: sampleAcademicCircuitsQuestions,
  SIGNALS_SYSTEMS: sampleAcademicSignalsSystemsQuestions,
  COMPUTER_ARCHITECTURE: sampleAcademicComputerArchitectureQuestions,
  MECHANICS_MATERIALS: sampleAcademicMechanicsMaterialsQuestions,
  OPERATIONS_RESEARCH: sampleAcademicOperationsResearchQuestions,
  DATABASES: sampleAcademicDatabasesQuestions,
  NETWORKS: sampleAcademicComputerNetworksQuestions,
  MACHINE_LEARNING: sampleAcademicMachineLearningQuestions,
  CONTROL_THEORY: sampleAcademicControlTheoryQuestions,
  OOP_ADVANCED: sampleAcademicOOPAdvancedQuestions,
  THERMODYNAMICS: sampleAcademicThermodynamicsQuestions,
  SEMICONDUCTORS: sampleAcademicSemiconductorsQuestions,
  FLUID_MECHANICS: sampleAcademicFluidMechanicsQuestions,
  COMPILERS: sampleAcademicCompilersQuestions,
  ELECTROMAGNETICS: sampleAcademicElectromagneticsQuestions,
  INFORMATION_SECURITY: sampleAcademicInformationSecurityQuestions,
  ELECTRONIC_CIRCUITS: sampleAcademicElectronicCircuitsQuestions,
  ENERGY_CONVERSION: sampleAcademicEnergyConversionQuestions,
  HEAT_MASS_TRANSFER: sampleAcademicHeatMassTransferQuestions,
  APPLIED_REGRESSION: sampleAppliedRegressionOnboardingQuestions,
  DEEP_LEARNING: sampleDeepLearningOnboardingQuestions,
  KINEMATICS_DYNAMICS: sampleKinematicsDynamicsOnboardingQuestions,
  STOCHASTIC_MODELS: sampleStochasticModelsOnboardingQuestions,
  MACHINE_DESIGN: sampleMachineDesignOnboardingQuestions,
  PRODUCTION_PLANNING: sampleProductionPlanningOnboardingQuestions,
  NONLINEAR_OPTIMIZATION: sampleNonlinearOptimizationOnboardingQuestions,
  BIG_DATA_ANALYTICS: sampleBigDataAnalyticsOnboardingQuestions,
  ADVANCED_MACHINE_LEARNING: sampleAdvancedMachineLearningOnboardingQuestions,
  DATA_TEXT_MINING: sampleDataTextMiningOnboardingQuestions,
  ADVANCED_DATABASES_NOSQL: sampleAdvancedDatabasesNoSQLOnboardingQuestions,
  SYSTEMS_ANALYSIS_ARCHITECTURE: sampleSystemsAnalysisArchitectureOnboardingQuestions,
  SIMULATION_SYSTEMS: sampleSimulationSystemsOnboardingQuestions,
  UI_UX_ENGINEERING: sampleUIUXEngineeringOnboardingQuestions,
  ENGINEERING_ECONOMY: sampleEngineeringEconomyOnboardingQuestions,
  QUALITY_ENGINEERING: sampleQualityEngineeringOnboardingQuestions,
  METHODS_ERGONOMICS: sampleMethodsEngineeringErgonomicsOnboardingQuestions,
  IS_SECURITY_RISK: sampleISSecurityRiskManagementOnboardingQuestions,
  STRUCTURAL_STATICS: sampleStructuralStaticsOnboardingQuestions,
  DIGITAL_LOGIC: sampleDigitalLogicOnboardingQuestions,
  DISTRIBUTED_SYSTEMS: sampleDistributedSystemsOnboardingQuestions,
  COMPUTER_VISION: sampleComputerVisionOnboardingQuestions,
  THEORY_COMPUTATION_COMPLEXITY:
    sampleTheoryComputationComplexityOnboardingQuestions,
  COMPLEX_FUNCTIONS: sampleAcademicComplexFunctionsQuestions,
  "academic-complex-functions": sampleComplexFunctionsOnboardingQuestions,
  DIGITAL_COMMUNICATIONS: sampleAcademicDigitalCommunicationsQuestions,
  "academic-digital-communications": sampleDigitalCommunicationsOnboardingQuestions,
  GENERAL_CHEMISTRY: sampleGeneralChemistryOnboardingQuestions,
  CAD: sampleCadMechanicalDesignOnboardingQuestions,
  MATERIALS_SCIENCE: sampleMaterialsScienceOnboardingQuestions,
  MECHANICAL_VIBRATIONS: sampleMechanicalVibrationsOnboardingQuestions,
  FEM: sampleFemOnboardingQuestions,
  DIGITAL_CONTROL_ROBOTICS: sampleDigitalControlRoboticsOnboardingQuestions,
  PYTHON: samplePythonProgrammingOnboardingQuestions,
  ORGANIZATION_THEORY: sampleOrganizationTheoryOnboardingQuestions,
  SUPPLY_CHAIN: sampleSupplyChainOnboardingQuestions,
  GAME_THEORY: sampleGameTheoryOnboardingQuestions,
  PLANT_LAYOUT: samplePlantLayoutOnboardingQuestions,
  BI: sampleBusinessIntelligenceOnboardingQuestions,
  INTRO_DS: sampleIntroDataScienceOnboardingQuestions,
  NLP: sampleNlpOnboardingQuestions,
};

export {
  ACADEMIC_CALC_QUESTIONS,
  CALCULUS_QUESTIONS,
  sampleCalculusOnboardingQuestions,
};
export {
  ACADEMIC_CALC2_QUESTIONS,
  CALCULUS_2_QUESTIONS,
  sampleCalculus2OnboardingQuestions,
};
export {
  ACADEMIC_LINALG_QUESTIONS,
  LINEAR_ALGEBRA_1_QUESTIONS,
  sampleLinearAlgebra1OnboardingQuestions,
};
export {
  ACADEMIC_LINALG2_QUESTIONS,
  LINEAR_ALGEBRA_2_QUESTIONS,
  sampleLinearAlgebra2OnboardingQuestions,
};
export {
  csDataStructuresQuestions,
  sampleCsDataStructuresOnboardingQuestions,
};
export {
  ACADEMIC_DISCRETE_MATH_QUESTIONS,
  DISCRETE_MATHEMATICS_QUESTIONS,
  sampleDiscreteMathOnboardingQuestions,
  sampleDiscreteMathByTag,
};
export {
  ACADEMIC_INTRO_CS_QUESTIONS,
  INTRO_CS_QUESTIONS,
  sampleIntroCSOnboardingQuestions,
};
export {
  ACADEMIC_ALGORITHMS_QUESTIONS,
  ALGORITHMS_QUESTIONS,
  sampleAlgorithmsOnboardingQuestions,
};
export {
  ACADEMIC_OPERATING_SYSTEMS_QUESTIONS,
  OPERATING_SYSTEMS_QUESTIONS,
  sampleOperatingSystemsOnboardingQuestions,
};
export {
  ACADEMIC_AUTOMATA_QUESTIONS,
  AUTOMATA_QUESTIONS,
  sampleAutomataOnboardingQuestions,
};
export {
  ACADEMIC_ELECTRIC_CIRCUITS_QUESTIONS,
  ELECTRIC_CIRCUITS_QUESTIONS,
  sampleCircuitsOnboardingQuestions,
};
export {
  ACADEMIC_PHYSICS_1_QUESTIONS,
  PHYSICS_1_QUESTIONS,
  samplePhysics1OnboardingQuestions,
};
export {
  ACADEMIC_PHYSICS_2_QUESTIONS,
  PHYSICS_2_QUESTIONS,
  samplePhysics2OnboardingQuestions,
};
export {
  ACADEMIC_PROB_QUESTIONS,
  PROBABILITY_STATISTICS_QUESTIONS,
  sampleProbabilityStatisticsOnboardingQuestions,
};
export {
  ACADEMIC_ODE_QUESTIONS,
  ORDINARY_DIFFERENTIAL_EQUATIONS_QUESTIONS,
  sampleODEOnboardingQuestions,
};
export {
  ACADEMIC_PDE_QUESTIONS,
  PDE_FOURIER_QUESTIONS,
  samplePDEOnboardingQuestions,
};
export {
  ACADEMIC_SIGNALS_SYSTEMS_QUESTIONS,
  SIGNALS_SYSTEMS_QUESTIONS,
  sampleSignalsSystemsOnboardingQuestions,
};
export {
  ACADEMIC_COMPUTER_ARCHITECTURE_QUESTIONS,
  COMPUTER_ARCHITECTURE_QUESTIONS,
  sampleComputerArchitectureOnboardingQuestions,
};
export {
  ACADEMIC_MECHANICS_MATERIALS_QUESTIONS,
  MECHANICS_MATERIALS_QUESTIONS,
  sampleMechanicsMaterialsOnboardingQuestions,
};
export {
  ACADEMIC_OPERATIONS_RESEARCH_QUESTIONS,
  OPERATIONS_RESEARCH_QUESTIONS,
  sampleOperationsResearchOnboardingQuestions,
};
export {
  ACADEMIC_DATABASES_QUESTIONS,
  DATABASES_QUESTIONS,
  sampleDatabasesOnboardingQuestions,
};
export {
  ACADEMIC_COMPUTER_NETWORKS_QUESTIONS,
  COMPUTER_NETWORKS_QUESTIONS,
  sampleComputerNetworksOnboardingQuestions,
};
export {
  ACADEMIC_MACHINE_LEARNING_QUESTIONS,
  MACHINE_LEARNING_QUESTIONS,
  sampleMachineLearningOnboardingQuestions,
};
export {
  ACADEMIC_CONTROL_THEORY_QUESTIONS,
  CONTROL_THEORY_QUESTIONS,
  sampleControlTheoryOnboardingQuestions,
};
export {
  ACADEMIC_OOP_ADVANCED_QUESTIONS,
  OOP_ADVANCED_QUESTIONS,
  sampleOOPAdvancedOnboardingQuestions,
};
export {
  ACADEMIC_THERMODYNAMICS_QUESTIONS,
  THERMODYNAMICS_QUESTIONS,
  sampleThermodynamicsOnboardingQuestions,
};
export {
  ACADEMIC_SEMICONDUCTORS_QUESTIONS,
  SEMICONDUCTORS_QUESTIONS,
  sampleSemiconductorsOnboardingQuestions,
};
export {
  ACADEMIC_FLUID_MECHANICS_QUESTIONS,
  FLUID_MECHANICS_QUESTIONS,
  sampleFluidMechanicsOnboardingQuestions,
};
export {
  ACADEMIC_COMPILERS_QUESTIONS,
  COMPILERS_QUESTIONS,
  sampleCompilersOnboardingQuestions,
};
export {
  ACADEMIC_ELECTROMAGNETICS_QUESTIONS,
  ELECTROMAGNETICS_QUESTIONS,
  sampleElectromagneticsOnboardingQuestions,
};
export {
  ACADEMIC_INFORMATION_SECURITY_QUESTIONS,
  INFORMATION_SECURITY_QUESTIONS,
  sampleInformationSecurityOnboardingQuestions,
};
export {
  ACADEMIC_ELECTRONIC_CIRCUITS_QUESTIONS,
  ELECTRONIC_CIRCUITS_QUESTIONS,
  sampleElectronicCircuitsOnboardingQuestions,
};
export {
  ACADEMIC_ENERGY_CONVERSION_QUESTIONS,
  ENERGY_CONVERSION_QUESTIONS,
  sampleEnergyConversionOnboardingQuestions,
};
export {
  ACADEMIC_HEAT_MASS_TRANSFER_QUESTIONS,
  HEAT_MASS_TRANSFER_QUESTIONS,
  sampleHeatMassTransferOnboardingQuestions,
};
export {
  ACADEMIC_APPLIED_REGRESSION_QUESTIONS,
  APPLIED_REGRESSION_QUESTIONS,
  sampleAppliedRegressionOnboardingQuestions,
};
export {
  ACADEMIC_DEEP_LEARNING_QUESTIONS,
  DEEP_LEARNING_QUESTIONS,
  sampleDeepLearningOnboardingQuestions,
};
export {
  ACADEMIC_KINEMATICS_DYNAMICS_QUESTIONS,
  KINEMATICS_DYNAMICS_QUESTIONS,
  sampleKinematicsDynamicsOnboardingQuestions,
};
export {
  ACADEMIC_STOCHASTIC_MODELS_QUESTIONS,
  STOCHASTIC_MODELS_QUESTIONS,
  sampleStochasticModelsOnboardingQuestions,
};
export {
  ACADEMIC_MACHINE_DESIGN_QUESTIONS,
  MACHINE_DESIGN_QUESTIONS,
  sampleMachineDesignOnboardingQuestions,
};
export {
  ACADEMIC_PRODUCTION_PLANNING_QUESTIONS,
  PRODUCTION_PLANNING_QUESTIONS,
  sampleProductionPlanningOnboardingQuestions,
};
export {
  ACADEMIC_NONLINEAR_OPTIMIZATION_QUESTIONS,
  NONLINEAR_OPTIMIZATION_QUESTIONS,
  sampleNonlinearOptimizationOnboardingQuestions,
};
export {
  ACADEMIC_BIG_DATA_ANALYTICS_QUESTIONS,
  BIG_DATA_ANALYTICS_QUESTIONS,
  sampleBigDataAnalyticsOnboardingQuestions,
};
export {
  ACADEMIC_ADVANCED_MACHINE_LEARNING_QUESTIONS,
  ADVANCED_MACHINE_LEARNING_QUESTIONS,
  sampleAdvancedMachineLearningOnboardingQuestions,
};
export {
  ACADEMIC_DATA_TEXT_MINING_QUESTIONS,
  DATA_TEXT_MINING_QUESTIONS,
  sampleDataTextMiningOnboardingQuestions,
};
export {
  ACADEMIC_ADVANCED_DATABASES_NOSQL_QUESTIONS,
  ADVANCED_DATABASES_NOSQL_QUESTIONS,
  sampleAdvancedDatabasesNoSQLOnboardingQuestions,
};
export {
  ACADEMIC_SYSTEMS_ANALYSIS_ARCHITECTURE_QUESTIONS,
  SYSTEMS_ANALYSIS_ARCHITECTURE_QUESTIONS,
  sampleSystemsAnalysisArchitectureOnboardingQuestions,
};
export {
  ACADEMIC_SIMULATION_SYSTEMS_QUESTIONS,
  SIMULATION_SYSTEMS_QUESTIONS,
  sampleSimulationSystemsOnboardingQuestions,
};
export {
  ACADEMIC_UI_UX_ENGINEERING_QUESTIONS,
  UI_UX_ENGINEERING_QUESTIONS,
  sampleUIUXEngineeringOnboardingQuestions,
};
export {
  ACADEMIC_ENGINEERING_ECONOMY_QUESTIONS,
  ENGINEERING_ECONOMY_QUESTIONS,
  sampleEngineeringEconomyOnboardingQuestions,
};
export {
  ACADEMIC_QUALITY_ENGINEERING_QUESTIONS,
  QUALITY_ENGINEERING_QUESTIONS,
  sampleQualityEngineeringOnboardingQuestions,
};
export {
  ACADEMIC_METHODS_ENGINEERING_ERGONOMICS_QUESTIONS,
  METHODS_ENGINEERING_ERGONOMICS_QUESTIONS,
  sampleMethodsEngineeringErgonomicsOnboardingQuestions,
};
export {
  ACADEMIC_IS_SECURITY_RISK_MANAGEMENT_QUESTIONS,
  IS_SECURITY_RISK_MANAGEMENT_QUESTIONS,
  sampleISSecurityRiskManagementOnboardingQuestions,
};
export {
  ACADEMIC_STRUCTURAL_STATICS_QUESTIONS,
  STRUCTURAL_STATICS_QUESTIONS,
  sampleStructuralStaticsOnboardingQuestions,
};
export {
  ACADEMIC_DIGITAL_LOGIC_QUESTIONS,
  DIGITAL_LOGIC_QUESTIONS,
  sampleDigitalLogicOnboardingQuestions,
};
export {
  ACADEMIC_DISTRIBUTED_SYSTEMS_QUESTIONS,
  DISTRIBUTED_SYSTEMS_QUESTIONS,
  sampleDistributedSystemsOnboardingQuestions,
};
export {
  ACADEMIC_COMPUTER_VISION_QUESTIONS,
  COMPUTER_VISION_QUESTIONS,
  sampleComputerVisionOnboardingQuestions,
};
export {
  ACADEMIC_THEORY_COMPUTATION_COMPLEXITY_QUESTIONS,
  THEORY_COMPUTATION_COMPLEXITY_QUESTIONS,
  sampleTheoryComputationComplexityOnboardingQuestions,
};
export {
  complexFunctionsQuestions,
  sampleComplexFunctionsOnboardingQuestions,
};
export {
  digitalCommunicationsQuestions,
  sampleDigitalCommunicationsOnboardingQuestions,
};
export {
  ACADEMIC_GENERAL_CHEMISTRY_QUESTIONS,
  GENERAL_CHEMISTRY_QUESTIONS,
  sampleGeneralChemistryOnboardingQuestions,
};
export {
  ACADEMIC_CAD_QUESTIONS,
  CAD_MECHANICAL_DESIGN_QUESTIONS,
  sampleCadMechanicalDesignOnboardingQuestions,
};
export {
  ACADEMIC_MATERIALS_SCIENCE_QUESTIONS,
  MATERIALS_SCIENCE_QUESTIONS,
  sampleMaterialsScienceOnboardingQuestions,
};
export {
  ACADEMIC_MECHANICAL_VIBRATIONS_QUESTIONS,
  MECHANICAL_VIBRATIONS_QUESTIONS,
  sampleMechanicalVibrationsOnboardingQuestions,
};
export {
  ACADEMIC_FEM_QUESTIONS,
  FINITE_ELEMENT_METHOD_QUESTIONS,
  sampleFemOnboardingQuestions,
};
export {
  ACADEMIC_DIGITAL_CONTROL_ROBOTICS_QUESTIONS,
  DIGITAL_CONTROL_ROBOTICS_QUESTIONS,
  sampleDigitalControlRoboticsOnboardingQuestions,
};
export {
  ACADEMIC_PYTHON_QUESTIONS,
  PYTHON_PROGRAMMING_QUESTIONS,
  samplePythonProgrammingOnboardingQuestions,
};
export {
  ACADEMIC_ORGANIZATION_THEORY_QUESTIONS,
  ORGANIZATION_THEORY_QUESTIONS,
  sampleOrganizationTheoryOnboardingQuestions,
};
export {
  ACADEMIC_SUPPLY_CHAIN_QUESTIONS,
  SUPPLY_CHAIN_MANAGEMENT_QUESTIONS,
  sampleSupplyChainOnboardingQuestions,
};
export {
  ACADEMIC_GAME_THEORY_QUESTIONS,
  GAME_THEORY_QUESTIONS,
  sampleGameTheoryOnboardingQuestions,
};
export {
  ACADEMIC_PLANT_LAYOUT_QUESTIONS,
  PLANT_LAYOUT_DESIGN_QUESTIONS,
  samplePlantLayoutOnboardingQuestions,
};
export {
  ACADEMIC_BI_QUESTIONS,
  BUSINESS_INTELLIGENCE_QUESTIONS,
  sampleBusinessIntelligenceOnboardingQuestions,
};
export {
  ACADEMIC_INTRO_DS_QUESTIONS,
  INTRO_DATA_SCIENCE_QUESTIONS,
  sampleIntroDataScienceOnboardingQuestions,
};
export {
  ACADEMIC_NLP_QUESTIONS,
  NLP_LANGUAGE_PROCESSING_QUESTIONS,
  sampleNlpOnboardingQuestions,
};

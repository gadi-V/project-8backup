export const TEACHER_ONBOARDING_STEPS = [
  { id: 1, label: "קליטת פרטי המועמדות" },
  { id: 2, label: "תיאום ראיון עם מנהל פדגוגי" },
  { id: 3, label: "פתיחת חשבון מורה" },
  { id: 4, label: "דף מורה והמלצות" },
  { id: 5, label: "מילוי שעות וזמינות לקליטת תלמידים" },
  { id: 6, label: "פעיל" },
] as const;

export type TeacherOnboardingInput = {
  isApproved: boolean;
  hasProfile: boolean;
  profileComplete: boolean;
  availabilityCount: number;
};

export type TeacherOnboardingStatus = {
  currentStep: number;
  isFullyActive: boolean;
  steps: Array<{
    id: number;
    label: string;
    status: "completed" | "current" | "pending";
  }>;
};

/** Derive onboarding step from teacher account state */
export function getTeacherOnboardingStatus(
  input: TeacherOnboardingInput
): TeacherOnboardingStatus {
  let currentStep = 2;

  if (input.isApproved) {
    currentStep = input.profileComplete ? (input.availabilityCount > 0 ? 6 : 5) : 4;
  }

  const steps = TEACHER_ONBOARDING_STEPS.map((step) => {
    let status: "completed" | "current" | "pending";
    if (step.id < currentStep) status = "completed";
    else if (step.id === currentStep) status = "current";
    else status = "pending";
    return { ...step, status };
  });

  return {
    currentStep,
    isFullyActive: currentStep === 6 && input.isApproved,
    steps,
  };
}

export function isTeacherProfileComplete(profile: {
  subjects: string[];
  ageGroups: string[];
  bio: string | null;
} | null): boolean {
  if (!profile) return false;
  return profile.subjects.length > 0 && profile.ageGroups.length > 0;
}

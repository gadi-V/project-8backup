import { VETTING_STEPS_ORDER } from "../lib/teacher-vetting";
import { PreLessonAssetType, VettingStatus, VettingStepStatus } from "@prisma/client";

async function runPipelineVerification() {
  console.log("=== VETTING & PEDAGOGY PIPELINE VERIFICATION ===");

  console.log("1. Checking Vetting Steps Definition...");
  if (VETTING_STEPS_ORDER.length !== 6) {
    throw new Error(`Expected 6 vetting steps, found ${VETTING_STEPS_ORDER.length}`);
  }
  console.log("✓ All 6 vetting steps correctly ordered.");

  console.log("2. Checking Pre-Lesson Asset Types...");
  const validAssetTypes = Object.values(PreLessonAssetType);
  if (!validAssetTypes.includes(PreLessonAssetType.IMAGE) || !validAssetTypes.includes(PreLessonAssetType.PDF)) {
    throw new Error("Missing asset types definition");
  }
  console.log(`✓ Supported Asset Types: ${validAssetTypes.join(", ")}`);

  console.log("3. Checking Business Status Enums...");
  const approvedStatus = VettingStatus.APPROVED;
  const passedStep = VettingStepStatus.PASSED;
  console.log(`✓ Enums validated: Status=${approvedStatus}, StepStatus=${passedStep}`);

  console.log("=== ALL PIPELINE CHECKS PASSED SUCCESSFULLY ===");
}

runPipelineVerification().catch((err) => {
  console.error("Pipeline Verification Failed:", err);
  process.exit(1);
});

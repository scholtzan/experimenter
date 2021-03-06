/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

//==============================================================
// START Enums and Input Objects
//==============================================================

export enum NimbusExperimentApplication {
  DESKTOP = "DESKTOP",
  FENIX = "FENIX",
}

export enum NimbusExperimentChannel {
  DESKTOP_BETA = "DESKTOP_BETA",
  DESKTOP_NIGHTLY = "DESKTOP_NIGHTLY",
  DESKTOP_RELEASE = "DESKTOP_RELEASE",
  DESKTOP_UNBRANDED = "DESKTOP_UNBRANDED",
  FENIX_BETA = "FENIX_BETA",
  FENIX_NIGHTLY = "FENIX_NIGHTLY",
  FENIX_RELEASE = "FENIX_RELEASE",
}

export enum NimbusExperimentFirefoxMinVersion {
  FIREFOX_100 = "FIREFOX_100",
  FIREFOX_80 = "FIREFOX_80",
  FIREFOX_81 = "FIREFOX_81",
  FIREFOX_82 = "FIREFOX_82",
  FIREFOX_83 = "FIREFOX_83",
  FIREFOX_84 = "FIREFOX_84",
  FIREFOX_85 = "FIREFOX_85",
  FIREFOX_86 = "FIREFOX_86",
  FIREFOX_87 = "FIREFOX_87",
  FIREFOX_88 = "FIREFOX_88",
  FIREFOX_89 = "FIREFOX_89",
  FIREFOX_90 = "FIREFOX_90",
  FIREFOX_91 = "FIREFOX_91",
  FIREFOX_92 = "FIREFOX_92",
  FIREFOX_93 = "FIREFOX_93",
  FIREFOX_94 = "FIREFOX_94",
  FIREFOX_95 = "FIREFOX_95",
  FIREFOX_96 = "FIREFOX_96",
  FIREFOX_97 = "FIREFOX_97",
  FIREFOX_98 = "FIREFOX_98",
  FIREFOX_99 = "FIREFOX_99",
}

export enum NimbusExperimentStatus {
  ACCEPTED = "ACCEPTED",
  COMPLETE = "COMPLETE",
  DRAFT = "DRAFT",
  LIVE = "LIVE",
  REVIEW = "REVIEW",
}

export enum NimbusExperimentTargetingConfigSlug {
  ALL_ENGLISH = "ALL_ENGLISH",
  TARGETING_FIRST_RUN = "TARGETING_FIRST_RUN",
  TARGETING_FIRST_RUN_CHROME_ATTRIBUTION = "TARGETING_FIRST_RUN_CHROME_ATTRIBUTION",
  TARGETING_HOMEPAGE_GOOGLE = "TARGETING_HOMEPAGE_GOOGLE",
  US_ONLY = "US_ONLY",
}

export enum NimbusFeatureConfigApplication {
  FENIX = "FENIX",
  FIREFOX_DESKTOP = "FIREFOX_DESKTOP",
}

export enum NimbusProbeKind {
  EVENT = "EVENT",
  SCALAR = "SCALAR",
}

export interface CreateExperimentInput {
  clientMutationId?: string | null;
  name: string;
  hypothesis: string;
  application: NimbusExperimentApplication;
}

export interface ReferenceBranchType {
  name: string;
  description: string;
  ratio: number;
  featureEnabled?: boolean | null;
  featureValue?: string | null;
}

export interface TreatmentBranchType {
  name: string;
  description: string;
  ratio: number;
  featureEnabled?: boolean | null;
  featureValue?: string | null;
}

export interface UpdateExperimentAudienceInput {
  clientMutationId?: string | null;
  nimbusExperimentId: number;
  channel?: NimbusExperimentChannel | null;
  firefoxMinVersion?: NimbusExperimentFirefoxMinVersion | null;
  populationPercent?: string | null;
  proposedDuration?: number | null;
  proposedEnrollment?: string | null;
  targetingConfigSlug?: NimbusExperimentTargetingConfigSlug | null;
  totalEnrolledClients?: number | null;
}

export interface UpdateExperimentBranchesInput {
  clientMutationId?: string | null;
  nimbusExperimentId: number;
  featureConfigId?: number | null;
  referenceBranch: ReferenceBranchType;
  treatmentBranches: (TreatmentBranchType | null)[];
}

export interface UpdateExperimentInput {
  clientMutationId?: string | null;
  name: string;
  hypothesis: string;
  id: string;
  publicDescription?: string | null;
}

export interface UpdateExperimentProbeSetsInput {
  clientMutationId?: string | null;
  nimbusExperimentId: number;
  primaryProbeSetIds: (number | null)[];
  secondaryProbeSetIds: (number | null)[];
}

export interface UpdateExperimentStatusInput {
  clientMutationId?: string | null;
  nimbusExperimentId: number;
  status: NimbusExperimentStatus;
}

//==============================================================
// END Enums and Input Objects
//==============================================================

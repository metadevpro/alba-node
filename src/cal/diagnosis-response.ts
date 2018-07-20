export interface DiagnosisResponse {
    name: string;
    version: string;
    timestamp: string; // ISO 8601
    checks: CheckResult[];
}

export interface CheckResult {
    name: string;
    desc: string;
    result: boolean;
}

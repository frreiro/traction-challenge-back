
export interface AssetsInformation {
	name: string;
	image: string;
	description: string;
	model: string;
	owner: string;
	status: ["Running" | "Alerting" | "Stopped"];
	health_level: number;
	company_unit_id: string;
}
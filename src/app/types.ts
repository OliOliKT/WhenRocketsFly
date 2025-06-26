export type Launch = {
  id: string;
  name: string;
  date: string;
  organization: string[];
  vehicle: string;
  mission_type: string[];
  launch_site: string;
  success: boolean | null;
  destination: string[];
  details: string;
  info_url: string;
};
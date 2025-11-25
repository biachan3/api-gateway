export interface ClinicUserType {
  id: number;
  username: string;
  email: string;
  full_name: string;
  password: string;
  created_at?: string | Date;
  updated_at?: string | Date;
}

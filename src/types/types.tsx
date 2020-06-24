export type Branch = {
  id: string;
  ar_name: string;
  en_name: string;
  latitude: number;
  longitude: number;
};

export type Department = {
  id: string;
  ar_name: string;
  en_name: string;
  ar_description: string;
  en_description: string;
};

export type Employee = {
  id: string;
  ar_name: string;
  en_name: string;
  department_id: string;
};

export type RequestType = {
  id: string;
  ar_name: string;
  en_name: string;
};

export type EmpRequest = {
  id: string;
  ar_name: string; // Fix
  en_name: string; // Fix
  employee_id: string;
  employee: Employee;
  request_type: RequestType;
  to_department: Department;
  request_status_id: 1 | 2;
};

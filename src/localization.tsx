import LocalizedStrings from "react-localization";

// Change the current language
const setLanguage = () => {
  const currentLanguage = localStorage.getItem("lang");

  if (currentLanguage === null || currentLanguage === "ar") {
    localStorage.setItem("lang", "en");
  } else if (currentLanguage === "en") {
    localStorage.setItem("lang", "ar");
  }

  window.location.reload();
};

const strings = new LocalizedStrings({
  en: {
    language: "English",
    en: "English",
    ar: "العربية",
    add: "Add",
    save: "Save",
    name: "Name",

    // Delete Dialog

    // Navigation & Home
    home: "Home",
    branches: "Branches",
    departments: "Departments",
    employees: "Employees",
    attendance: "Attendance",
    employeeRequests: "Employee Requests",
    requestTypes: "Request Types",
    signIn: "Sign In",

    // Branches
    addBranch: "Add Branch",
    editBranch: "ُEdit Branch",
    branchName: "Branch Name",

    // Departments
    addDepartment: "Add Department",
    editDepartment: "ُEdit Department",
    departmentName: "Department Name",

    // Employees
    addEmployee: "Add Employee",
    editEmployee: "ُEdit Employee",
    editEmployeeError: "Please fill all fields",


    // Request Types
    addType: "Add Request Type",
    editType: "Edit Request Type",
    typeNameEn: "Type Name in English",
    typeDescriptionEn: "Description in English",
    typeDescrptionAr: "Description in Arabic",
    typeNameAr: "Type Name in Arabic",
    typeInputError: 'Please fill all fields',
    departmentError: "Please enter department",

    // Attendance
    table: {
      day: "Day",
      arrival: "Arrival",
      exit: "Exit",
    },
    tableTitle: "Attendance Table",
    employeeMenu: "Employee Name",
    monthMenu: "Month",
  },

  ar: {
    language: "العربية",
    ar: "العربية",
    en: "English",
    add: "اضافة",
    name: "الاسم",
    save: "حفظ",

    // NAVIGATION & HOME
    home: "الرئيسية",
    branches: "الفروع",
    departments: "الاقسام",
    employees: "ادارة الموظفين",
    attendance: "الحضور و الانصراف",
    employeeRequests: "طلبات الموظفين",
    signIn: "تسجيل الدخول",
    requestTypes: "تصنيفات الطلبات",

    // BRANCHES
    addBranch: "اضافة فرع جديد",
    editBranch: "تعديل الفرع",
    branchName: "اسم الفرع",

    // EMPLOYEES
    addEmployee: "اضافة موظف جديد",
    editEmployee: "تعديل الموظف",
    editEmployeeError: "برجاء ملئ جميع الخانات",

    // DEPARTMENTS
    addDepartment: "اضافة قسم جديد",
    editDepartment: "تعديل القسم",
    departmentName: "اسم القسم",

    // REQUEST TYPES
    addType: "أضافة تصنيف",
    editType: "تعديل التصنيف",
    typeNameAr: "اسم التصنيف بالعربية",
    typeNameEn: "اسم التصنيف بالانجليزية",
    typeDescriptionEn: "الوصف بالانجليزية",
    typeDescrptionAr: "الوصف بالعربية",
    departmentError: 'برجاء ادخال القسم',


    // ATTENDANCE
    table: {
      day: "اليوم",
      arrival: "الحضور",
      exit: "الانصراف",
    },
    tableTitle: "جدول الحضور و الانصراف",
    employeeMenu: "اسم الموظف",
    monthMenu: "الشهر",
  },
});

const language = localStorage.getItem("lang");
strings.setLanguage(language === null ? "ar" : language);

export { setLanguage, strings };

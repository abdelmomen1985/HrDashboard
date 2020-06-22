import React from 'react';
import LocalizedStrings from 'react-localization';

// Change the current language

const setLanguage = () => {
    const currentLanguage = localStorage.getItem('lang');

    if (currentLanguage === null || currentLanguage === 'ar') {
        localStorage.setItem('lang', 'en');
    } else if (currentLanguage === 'en') {
        localStorage.setItem('lang', 'ar');
    };

    window.location.reload()
};

const strings = new LocalizedStrings({
    en: {
        language: 'English',
        add: "Add",
        save: "Save",
        name: "Name",

        // Delete Dialog


        // Navigation & Home
        home: "Home",
        branches: "Branches",
        departments: 'Departments',
        employees: "Employees",
        attendance: "Attendance",
        leaveRequests: 'Leave Requests',
        signIn: 'Sign In',

        // Branches
        addBranch: "Add Branch",
        editBranch: 'ُEdit Branch',
        branchName: 'Branch Name',

        // Departments
        addDepartment: "Add Department",
        editDepartment: 'ُEdit Department',
        departmentName: 'Department Name',

        // Employees
        addEmployee: "Add Employee",
        editEmployee: 'ُEdit Employee',
        editEmployeeError: 'Please fill all fields',

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
        add: "اضافة",
        name: "الاسم",
        save: "حفظ",

        // NAVIGATION & HOME
        home: "الرئيسية",
        branches: 'الفروع',
        departments: 'الاقسام',
        employees: "ادارة الموظفين",
        attendance: "الحضور و الانصراف",
        leaveRequests: 'طلبات الاجازة',
        signIn: 'تسجيل الدخول',

        // BRANCHES
        addBranch: "اضافة فرع جديد",
        editBranch: 'تعديل الفرع',
        branchName: 'اسم الفرع',

        // EMPLOYEES
        addEmployee: "اضافة موظف جديد",
        editEmployee: 'تعديل الموظف',
        employeeError: 'برجاء ملئ جميع الخانات',
      

        // DEPARTMENTS
        addDepartment: "اضافة قسم جديد",
        editDepartment: 'تعديل القسم',
        departmentName: 'اسم القسم',

        // ATTENDANCE
        table: {
            day: "اليوم",
            arrival: "الحضور",
            exit: "الانصراف",
        },
        tableTitle: 'جدول الحضور و الانصراف',
        employeeMenu: "اسم الموظف",
        monthMenu: "الشهر",


    }
});

const language = localStorage.getItem('lang');
strings.setLanguage(language === null ? 'ar' : language)

export { setLanguage, strings }
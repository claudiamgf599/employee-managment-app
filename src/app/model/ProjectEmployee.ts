export class ProjectEmployee {
    empProjectId: number;
    projectId: number;
    empId: number;
    assignedDate: string;
    role: string;
    isActive: boolean;
    projectName?: string;
    employeeName?: string;

    constructor() {
        this.empProjectId = 0;
        this.projectId = 0;
        this.empId = 0;
        this.assignedDate = "";
        this.role = "";
        this.isActive = true;
        this.projectName = "";
        this.employeeName = "";
    }
}
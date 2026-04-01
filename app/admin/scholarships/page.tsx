import { ScholarshipActionBar } from "@/components/admin/scholarships/scholarshipActionBar";
import { ScholarshipList } from "@/components/admin/scholarships/scholarshipList";
import { ScholarshipPagination } from "@/components/admin/pagination";

export default function AdminScholarships() {
    return (
        <div className="flex flex-col gap-6">
            <h1 className="text-2xl font-bold text-gray-900">Scholarships</h1>
            <ScholarshipActionBar />
            <ScholarshipList />
            <ScholarshipPagination />
        </div>
    );
}

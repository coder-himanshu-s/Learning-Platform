
import { useGetCourseDetailsWithStatusQuery } from "@/features/api/purchaseApi";
import { useParams,Navigate } from "react-router";

const PurchaseCourseProtectedRoute = ({children})=>{
    const { courseId} = useParams();
    const { data,isLoading} = useGetCourseDetailsWithStatusQuery(courseId);

    if( isLoading) return <p>Loading ...</p>
    return data?.purchased ? children :<Navigate  to={`/course-detail/${courseId}`}/>
}

export default PurchaseCourseProtectedRoute
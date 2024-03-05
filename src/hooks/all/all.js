import { useQuery, useMutation, useQueryClient } from "react-query";
import * as all from "@/services/all/all";

export const useAppEmployeeDashboard = (id) => {
    return useQuery(["appEmployeeDashboard", id], () => all.appEmployeeDashboard(id), {
        enabled: false,
        retry: false,
        refetchOnReconnect: true,
        refetchOnWindowFocus: false,
    });
};

export const useAppEmployeeTimeSheet = (id) => {
    return useQuery(["appTimeSheet", id], () => all.appTimeSheet(id), {
        enabled: false,
        retry: false,
        refetchOnReconnect: true,
        refetchOnWindowFocus: false,
    });
};

export const useLoginDashboard = () => {
    const queryClient = useQueryClient();
    return useMutation((formData) => all.loginDashboard(formData), {
        onSuccess: () => {
            queryClient.refetchQueries('appEmployeeDashboard');
            queryClient.refetchQueries('appTimeSheet');
        }
    });
};

export const useLogoutDashboard = (formData) => {
    const queryClient = useQueryClient();
    return useMutation((formData) => all.logoutDashboard(formData), {
        onSuccess: () => {
            queryClient.refetchQueries('appEmployeeDashboard');
            queryClient.refetchQueries('appTimeSheet');
        }
    });
};
import axios from "axios";
axios.defaults.withCredentials = true;

export const packageServiceAddPackage = async (formData: object) => {
  const res = await axios.post(
    `${process.env.NEXT_PUBLIC_API_LOCAL_URL}/packages/add-package`,
    formData
  );
  return res;
};

export const packageServiceGetAll = async () => {
  const res = await axios.get(
    `${process.env.NEXT_PUBLIC_API_LOCAL_URL}/packages/`
  );
  return res.data;
};

export const packageServiceGetSingleById = async (id: string) => {
  const res = await axios.get(
    `${process.env.NEXT_PUBLIC_API_LOCAL_URL}/packages/single/${id}`
  );
  return res;
};

export const packageServiceGetPackagesByUserIdAndStatus = async (
  userId: number,
  status: string
) => {
  const res = await axios.get(
    `${process.env.NEXT_PUBLIC_API_LOCAL_URL}/packages/${userId}/${status}`
  );
  return res.data;
};

export const packageServiceAssignPackage = async (
  packageId: string,
  userId: number
) => {
  const res = await axios.put(
    `${process.env.NEXT_PUBLIC_API_LOCAL_URL}/packages/assign-package/${packageId}/${userId}`
  );
  return res;
};

export const packageServiceFinishTrip = async (packageId: string) => {
  const res = await axios.put(
    `${process.env.NEXT_PUBLIC_API_LOCAL_URL}/packages/finish-trip/${packageId}`
  );
  return res;
};

export const packageServiceRemoveAssignPackage = async (packageId: string) => {
  const res = await axios.put(
    `${process.env.NEXT_PUBLIC_API_LOCAL_URL}/packages/remove-assign/${packageId}`
  );
  return res;
};

export const packageServiceGetNumberOfPacakgesAndPackagesStatusByDate = async (
  date: string
) => {
  const res = await axios.get(
    `${process.env.NEXT_PUBLIC_API_LOCAL_URL}/packages/number-of-pacakges-and-packages-ongoing-by-date/${date}`
  );
  return res.data;
};

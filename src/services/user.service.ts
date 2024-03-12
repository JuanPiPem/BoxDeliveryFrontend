import axios from "axios";
axios.defaults.withCredentials = true;

export const userServiceRegister = async (formData: object) => {
  const res = await axios.post(
    `${process.env.NEXT_PUBLIC_API_LOCAL_URL}/users/register`,
    formData
  );
  return res;
};

export const userServiceLogin = async (userData: object) => {
  const res = await axios.post(
    `${process.env.NEXT_PUBLIC_API_LOCAL_URL}/users/login`,
    userData,
    {
      withCredentials: true,
    }
  );
  return res;
};

export const userServiceMe = async () => {
  const res = await axios.get(
    `${process.env.NEXT_PUBLIC_API_LOCAL_URL}/users/me`,
    {
      withCredentials: true,
    }
  );
  return res.data;
};

export const userServiceGetSingle = async (id: number) => {
  const res = await axios.get(
    `${process.env.NEXT_PUBLIC_API_LOCAL_URL}/users/single/${id}`
  );
  return res.data;
};

export const userServiceRestorePassword = async (email: string) => {
  const res = await axios.put(
    `${process.env.NEXT_PUBLIC_API_LOCAL_URL}/users/restore-password`,
    {
      email,
    }
  );
  return res;
};

export const userServiceValidateTokenToRestorePassword = async (
  token: string
) => {
  const res = await axios.get(
    `${process.env.NEXT_PUBLIC_API_LOCAL_URL}/users/validate-token${token}`
  );
  return res;
};

export const userServiceOverwritePassword = async (
  password: string,
  token: string
) => {
  const res = await axios.put(
    `${process.env.NEXT_PUBLIC_API_LOCAL_URL}/users/overwrite-password/${token}`,
    {
      password,
    },
    { withCredentials: true }
  );
  return res;
};

export const userServiceLogout = async () => {
  const res = await axios.post(
    `${process.env.NEXT_PUBLIC_API_LOCAL_URL}/users/logout`,
    { withCredentials: true }
  );
  return res;
};

export const userServiceConfirmEmail = async (token: string) => {
  const res = await axios.put(
    `${process.env.NEXT_PUBLIC_API_LOCAL_URL}/users/confirm-email/${token}`
  );
  return res;
};

export const userServiceGetAll = async () => {
  const res = await axios.get(
    `${process.env.NEXT_PUBLIC_API_LOCAL_URL}/users/`
  );
  return res.data;
};

export const userServiceGetDeliverymen = async () => {
  const res = await axios.get(
    `${process.env.NEXT_PUBLIC_API_LOCAL_URL}/users/deliverymen`
  );
  return res.data;
};

export const userServiceGetNumberOfDeliverymenAndEnadledDeliverymen =
  async () => {
    const res = await axios.get(
      `${process.env.NEXT_PUBLIC_API_LOCAL_URL}/users//number-of-deliverymen-and-enabled-deliverymen`
    );
    return res.data;
  };

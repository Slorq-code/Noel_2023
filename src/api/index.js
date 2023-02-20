import Vue from "vue";

export const Login = async identification => {
  const resp = await Vue.axios({
    method: "POST",
    url: "v1/login",
    data: {
      identification,
    },
  });
  return resp.data;
};

export const ClearSession = async () => {
  const resp = await Vue.axios({
    method: "POST",
    url: "v1/logout",
  });
  return resp.data;
};

export const UpdateUser = async user => {
  const resp = await Vue.axios({
    method: "POST",
    url: "update-profile",
    data: user,
  });
  return resp.data;
};

export const Register = async user => {
  const resp = await Vue.axios({
    method: "POST",
    url: "v1/register",
    data: user,
  });
  return resp.data;
};

export const SaveMessage = async data => {
  const resp = await Vue.axios({
    method: "POST",
    url: "v1/store-pqr",
    data,
  });
  return resp.data;
};

export const GetBalance = async () => {
  const resp = await Vue.axios({
    method: "Get",
    url: "v1/get-balance",
  });
  return resp.data;
};

export const GetCliente = async (page) => {
    const resp = await Vue.axios({
      method: "Get",
      url: `v1/latest-winners?_page=${page}`,
    });

//   const { data } = await clientsApi.get(`v1/latest-winners?_page=${page}`);
//   return data;
//   const resp = await Vue.axios({
//     method: "Get",
//     url: "v1/latest-winners?page='${noPagina}'"
//   });

  return resp.data;
};

export const SaveCodes = async data => {
  const resp = await Vue.axios({
    method: "POST",
    url: "v1/code-redemptions",
    data,
  });
  return resp.data;
};

export const GetCodes = async () => {
  const resp = await Vue.axios({
    method: "Get",
    url: "v1/code-redemptions",
  });
  return resp.data;
};

export const GetCodesRedemtions = async () => {
  const resp = await Vue.axios({
    method: "GET",
    url: "v1/code-redemptions",
  });

  return resp.data;
};

export const GetLatestWinners = async () => {
  const resp = await Vue.axios({
    method: "GET",
    url: "v1/latest-winners",
  });

  return resp.data;
};

export const GetStatus = async () => {
  const resp = await Vue.axios({
    method: "Get",
    url: "v1/get-status-user",
  });
  return resp.data;
};
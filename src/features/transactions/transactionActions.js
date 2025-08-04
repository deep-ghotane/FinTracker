import {} from "../../utils/axiosHelper";
import { deleteTransaction, getTransation } from "./transactionAxios";
import { setTransactions } from "./transactionSlice";

export const fetchTransactions = () => async (dispatch) => {
  let data = await getTransation();

  console.log(data);
  dispatch(setTransactions(data.transactions));

  return { status: data.status, message: data.message };
};

export const removeTransaction = (idsToDelete) => async (dispatch) => {
  // delete axios
  let data = await deleteTransaction(idsToDelete);

  if (data.status) {
    dispatch(fetchTransactions());
  }

  return { status: data.status, message: data.message };
};

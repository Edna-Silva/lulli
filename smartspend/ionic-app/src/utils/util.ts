import storage from "../redux/store"; 
import {
    smartSpendAPI
} from "../services/backend";

export const fetchAndStoreAPIData = async (dispatch: any) => {
  try {
   
    const api = smartSpendAPI.endpoints;
    
    const queries = [
        api.getUser,
        api.getWallets,
        api.getBankAccounts,
        api.getTransactions,
        api.getCategory,
        api.getStatistics,
        api.getPlannedPayments,
        api.getBudgets
      ];
  
      const results = await Promise.allSettled(queries.map(query => {
        const promise = dispatch(query.initiate());
        return promise.then((result: any) => result.data); // Extract data on success
      }));

      const storageKeys = ['user', 'wallets', 'bankaccounts', 'transactions', 'categories', 'statistics', 'plannedpayments', 'budgets'];

    // Store data in Ionic Storage, filter for successful results
    await Promise.all(
      results.map((result, index) => {
        if (result.status === 'fulfilled') {
            // console.log(result.value);
            
          return storage.set(storageKeys[index], result.value);
        } else {
          console.error(`Error fetching ${storageKeys[index]}:`, result.reason);
          return null; // Don't store on error
        }
      })
    );
    
  } catch (error) {
    console.error("Error fetching and storing API data:", error);
    // Handle errors appropriately, e.g., display a notification
  }
};

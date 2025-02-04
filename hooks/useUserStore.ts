import {create} from 'zustand';

interface UserStoreType {
    planId : string,
    name : string,
    email : string,
    paymentGateway : string,
    setStoreState: (state: Partial<UserStoreType>) => void
}

export const useUserStore = create<UserStoreType>((set) => ({
    planId : '',
    name : '',
    email :'',
    paymentGateway : '',
    setStoreState: (newState: Partial<UserStoreType>) => {
        set((state) => ({ ...state, ...newState }));
    },
}))
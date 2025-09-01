/* eslint-disable react-hooks/exhaustive-deps */
"use client"
import { createContext, useState, useEffect, useContext } from "react";
import io, { Socket } from "socket.io-client";
import { useRouter } from "next/navigation";
import { errorAlert, successAlert } from "@/components/others/ToastGroup";
import { coinInfo } from "@/utils/types";
import UserContext from "@/context/UserContext";
import { BACKEND_URL } from "@/config/TextData";

interface Context {
    socket?: Socket;
    counter?: number;
    randValue?: number;
    setRandValue?: Function;
    userArr?: any[];
    setUserArr?: Function;
    playerNumber?: number;
    setPlayerNumber?: Function;
    isLoading?: boolean;
    setIsLoading?: Function;
    isShowModal?: string;
    setIsShowModal?: Function;
    currentDepositAmount?: number;
    setCurrentDepositAmount?: Function;
    numberDecimals?: number;
    alertState?: AlertState;
    setAlertState?: Function;
    newToken: coinInfo[];
    setNewToken: Function;
    newTx: any[];
    setNewTx: Function;
}

const context = createContext<Context>({
    newToken: [],
    setNewToken: undefined,
    newTx: [],
    setNewTx: undefined
});

export const useSocket = () => useContext(context);

const SocketProvider = (props: { children: any }) => {
    const { setCoinId } = useContext(UserContext)
    const [socket, setSocket] = useState<Socket>();
    const [counter, setCounter] = useState<number>(1);
    const [randValue, setRandValue] = useState<number>(0);
    const [userArr, setUserArr] = useState<any[]>();
    const [playerNumber, setPlayerNumber] = useState(0);
    const [isLoading, setIsLoading] = useState(false);
    const [isShowModal, setIsShowModal] = useState('');
    const [currentDepositAmount, setCurrentDepositAmount] = useState(0);
    const [numberDecimals, setNumberDecimals] = useState(3);
    const [alertState, setAlertState] = useState<AlertState>({
        open: false,
        message: '',
        severity: undefined,
    })
    const [newToken, setNewToken] = useState<coinInfo[]>([]);
    const [newTx, setNewTx] = useState<any[]>([]);

    const router = useRouter();

    const connectionUpdatedHandler = (data: number) => {
        setCounter(data);
    };

    const createSuccessHandler = (name: string) => {
        setAlertState({
            open: true,
            message: 'Success',
            severity: 'success',
        });
        successAlert(`Successfully Created token: ${name}`);
        setIsLoading(false);
    }

    const createFailedHandler = (name: string, mint: string) => {
        setAlertState({
            open: true,
            message: 'Failed',
            severity: 'error',
        });
        errorAlert(`Failed Create token: ${name}`)
        setIsLoading(false);
    }

    const createMessageHandler = (updateCoinId: string) => {
        setCoinId(updateCoinId);
    }

    const newTransaction = (data: any, user: any) => {
        // Update the `data.holder` with the user._id
        const updatedData = {
            ...data,  // Spread the existing data
            holder: user, // Change the holder to user._id
        };

        // Update the state with the modified data object
        setNewTx(updatedData);
    };

    // init socket client object
    useEffect(() => {

        const socket = io(BACKEND_URL!, {
            transports: ["websocket"],
        });
        socket.on("connect", async () => {
            console.log(" --@ connected to backend", socket.id);
        });
        socket.on("disconnect", () => {
            console.log(" --@ disconnected from backend", socket.id);
        });
        setSocket(socket);

        return () => {

            socket.off("connect");
            socket.off("disconnect");
            setSocket(undefined);
            // socket?.disconnect();

        };
    }, [router]);

    useEffect(() => {
        socket?.on("connectionUpdated", async (counter: number) => {

            connectionUpdatedHandler(counter)
        });

        socket?.on("Creation", () => {
            console.log("--------@ Token Creation: ");

        });
        socket?.on("TokenCreated", async (data: any) => {

            createSuccessHandler(data.name);
            setCounter((prev) => prev + 1); // Increment counter
            setNewToken(data.data);
        });

        socket?.on("TokenNotCreated", async (name: string, mint: string) => {
            createFailedHandler(name, mint);
        });

        socket?.on("MessageUpdated", async (updateCoinId: string) => {
            if (updateCoinId) {
                createMessageHandler(updateCoinId)
            }
        })

        socket?.on("Swap", async (data: any) => {
            newTransaction(data.data, data.user)
        })

        return () => {
            socket?.off("Creation", createSuccessHandler);
            socket?.off("TokenCreated", createSuccessHandler);
            socket?.off("TokenNotCreated", createFailedHandler);
            socket?.off("MessageUpdated", createMessageHandler);
            socket?.off("Swap", createMessageHandler);


            socket?.disconnect();
        };
    }, [socket]);

    return (
        <context.Provider
            value={{
                socket,
                counter,
                randValue,
                setRandValue,
                userArr,
                setUserArr,
                playerNumber,
                setPlayerNumber,
                isLoading,
                setIsLoading,
                isShowModal,
                setIsShowModal,
                currentDepositAmount,
                setCurrentDepositAmount,
                numberDecimals,
                alertState,
                setAlertState,
                newToken,
                setNewToken,
                newTx,
                setNewTx
            }}
        >
            {props.children}
        </context.Provider>
    );
};

export interface AlertState {
    open: boolean
    message: string
    severity: 'success' | 'info' | 'warning' | 'error' | undefined
}

export default SocketProvider;
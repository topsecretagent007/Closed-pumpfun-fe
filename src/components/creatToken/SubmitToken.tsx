"use client";
import {
  ChangeEvent,
  useContext,
  useEffect,
  useState,
} from "react";
import { useRouter } from "next/navigation";
import { useWallet } from "@solana/wallet-adapter-react";
import UserContext from "@/context/UserContext";
import Spinner from "@/components/loadings/Spinner";
import { errorAlert, successAlert } from "@/components/others/ToastGroup";
import { createToken } from "@/program/web3";
import { createCoinInfo, launchDataInfo, metadataInfo } from "@/utils/types";
import { uploadImage, uploadMetadata } from "@/utils/fileUpload";
import ImageUpload from "../upload/ImageUpload";
import { ConnectButton } from "../buttons/ConnectButton";

export default function SubminToekn() {
  const { login, setIsLoading, isLoading, setSubmitModalState } = useContext(UserContext);
  const [newCoin, setNewCoin] = useState<createCoinInfo>({} as createCoinInfo);

  const [profilImageUrl, setProfileIamgeUrl] = useState<string>("");
  const [profileImagePreview, setProfileImagePreview] = useState<string | null>(null);
  const wallet = useWallet();
  const router = useRouter();
  const [errors, setErrors] = useState({
    name: false,
    ticker: false,
    image: false,
  });

  useEffect(() => {
    // Clear errors when newCoin changes
    setErrors({
      name: !newCoin.name,
      ticker: !newCoin.ticker,
      image: !profilImageUrl,
    });
  }, [newCoin, profilImageUrl]);

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setNewCoin({ ...newCoin, [e.target.id]: e.target.value });
  };

  const validateForm = () => {
    const validationErrors = {
      name: !newCoin.name,
      ticker: !newCoin.ticker,
      description: !newCoin.description,
      image: !profilImageUrl,
    };
    setErrors(validationErrors);
    return !Object.values(validationErrors).includes(true);
  };

  const createCoin = async () => {
    if (!validateForm()) {
      errorAlert("Please fix the errors before submitting.");
      return;
    }
    try {
      setIsLoading(true);
      // Process image upload
      const uploadedImageUrl = await uploadImage(profilImageUrl);
      if (!uploadedImageUrl) {
        errorAlert("Image upload failed.");
        setIsLoading(false);
        return;
      }
      const jsonData: metadataInfo = {
        name: newCoin.name,
        symbol: newCoin.ticker,
        image: uploadedImageUrl,
        description: newCoin.description,
        presale: newCoin.presale,
        createdOn: "https://test.com",
        twitter: newCoin.twitter || undefined,   // Only assign if it exists
        website: newCoin.website || undefined,   // Only assign if it exists
        instagram: newCoin.instagram || undefined,   // Only assign if it exists
        telegram: newCoin.telegram || undefined   // Only assign if it exists
      }
      // Process metadata upload
      const uploadMetadataUrl = await uploadMetadata(jsonData);
      if (!uploadMetadataUrl) {
        errorAlert("Metadata upload failed.");
        setIsLoading(false);
        return;
      }

      const coinData: launchDataInfo = {
        name: newCoin.name,
        symbol: newCoin.ticker,
        uri: uploadMetadataUrl,
        decimals: 6,
        virtualReserves: 2_000_000_000,
        tokenSupply: 1_000_000_000_000_000,
        presale: newCoin.presale,
      }

      const res = await createToken(wallet, coinData);
      if (res === "WalletError" || !res) {
        errorAlert("Payment failed or was rejected.");
        setIsLoading(false);
        return;
      }
      router.push("/archive");
      successAlert(res.msg);
    } catch (error) {
      errorAlert("An unexpected error occurred.");
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  const formValid =
    newCoin.name &&
    newCoin.ticker &&
    newCoin.description &&
    profilImageUrl

  return (
    <div className="relative mx-auto w-full">
      <div className="z-20 relative flex flex-col bg-transparent pt-20 pb-40 w-full h-full">
        <div className="flex flex-col justify-center items-center gap-2 w-full">
          <div className="flex flex-row items-center gap-2 pb-5 font-semibold text-2xl">
            <p className="text-white">Launch</p>
            <p className="text-[#784FD8]">Your Token On Solana</p>
          </div>
        </div>
        <div className="flex flex-col justify-between items-start sm2:gap-10 mx-auto w-full max-w-[640px] h-full">
          <div className="flex flex-col gap-4 py-5 w-full">
            <div className="flex flex-col justify-between items-center gap-4 w-full">
              <div className="flex flex-row justify-between items-center gap-4 pt-6 w-full">
                <div className="flex flex-col w-[95%]">
                  <label htmlFor="name" className="flex flex-row gap-1 font-semibold text-white text-lg">
                    Token Name*
                  </label>
                  <input
                    id="name"
                    type="text"
                    value={newCoin.name || ""}
                    onChange={handleChange}
                    placeholder="Ex. Solana"
                    className={`block w-full p-2.5 rounded-lg bg-[#131313] text-white outline-none border-white/10 border-[1px]`}
                  />
                  <span className="w-full text-white/10 text-sm">
                    Max 32 characters in Token name
                  </span>
                </div>
                <div className="flex flex-col w-[95%]">
                  <label
                    htmlFor="ticker"
                    className="flex flex-row gap-1 font-semibold text-white text-lg"
                  >
                    Token Symbol*
                  </label>
                  <input
                    id="ticker"
                    type="text"
                    maxLength={8}
                    value={newCoin.ticker || ""}
                    onChange={handleChange}
                    placeholder="input ticker"
                    className={`block w-full p-2.5 rounded-lg bg-[#131313] text-white outline-none border-white/10 border-[1px]`}
                  />
                  <span className="w-full text-white/10 text-sm">
                    Max 08 characters in Token Symbol
                  </span>
                </div>
              </div>

              <div className="flex flex-col w-full">
                <label htmlFor="description" className="flex flex-row gap-1 font-semibold text-white text-lg">
                  Token Description*
                </label>
                <textarea
                  id="description"
                  rows={2}
                  maxLength={250}
                  value={newCoin.description || ""}
                  onChange={handleChange}
                  placeholder="Ex. First community token a Solana..."
                  className={`block w-full min-h-[110px] p-2.5 rounded-lg bg-[#131313] text-white outline-none border-white/10 border-[1px]`}
                />
                <span className="w-full text-white/10 text-sm">
                  Max 250 characters
                </span>
              </div>

              <div className="flex flex-row justify-between items-center gap-4 pt-6 w-full">
                <div className="flex flex-col w-[95%]">
                  <label htmlFor="name" className="font-semibold text-white text-lg">
                    Website
                  </label>
                  <div className="flex flex-row border-[#000] border-[1px] rounded-lg w-full h-full">
                    <input
                      type="text"
                      id="website"
                      value={newCoin.website || ""}
                      onChange={handleChange}
                      placeholder="Enter website URL"
                      className={`block w-full p-2.5 rounded-lg bg-[#131313] text-white outline-none border-white/10 border-[1px]`}
                    />
                  </div>
                </div>

                <div className="flex flex-col w-[95%]">
                  <label htmlFor="name" className="font-semibold text-white text-lg">
                    Twitter
                  </label>
                  <div className="flex flex-row border-[#000] border-[1px] rounded-lg w-full h-full">
                    <input
                      type="text"
                      id="twitter"
                      value={newCoin.twitter || ""}
                      onChange={handleChange}
                      placeholder="Enter twitter URL"
                      className={`block w-full p-2.5 rounded-lg bg-[#131313] text-white outline-none border-white/10 border-[1px]`}
                    />
                  </div>
                </div>
              </div>

              <div className="flex flex-row justify-between items-center gap-4 pt-6 w-full">
                <div className="flex flex-col w-[95%]">
                  <label htmlFor="name" className="font-semibold text-white text-lg">
                    Instagram
                  </label>
                  <div className="flex flex-row border-[#000] border-[1px] rounded-lg w-full h-full">
                    <input
                      type="text"
                      id="instagram"
                      value={newCoin.instagram || ""}
                      onChange={handleChange}
                      placeholder="Enter instagram URL"
                      className={`block w-full p-2.5 rounded-lg bg-[#131313] text-white outline-none border-white/10 border-[1px]`}
                    />
                  </div>
                </div>
                <div className="flex flex-col w-[95%]">
                  <label htmlFor="telegram" className="font-semibold text-white text-lg">
                    Telegram
                  </label>
                  <div className="flex flex-row border-[#000] border-[1px] rounded-lg w-full h-full">
                    <input
                      type="text"
                      id="telegram"
                      value={newCoin.telegram || ""}
                      onChange={handleChange}
                      placeholder="Enter URL"
                      className={`block w-full p-2.5 rounded-lg bg-[#131313] text-white outline-none border-white/10 border-[1px]`}
                    />
                  </div>
                </div>
              </div>

              <ImageUpload header="Token Logo" setFilePreview={(fileName) => setProfileImagePreview(fileName)} setFileUrl={(fileUrl) => setProfileIamgeUrl(fileUrl)} type="image/*" />
            </div>
          </div>
          {(wallet.publicKey && login) ?
            <button
              onClick={createCoin}
              disabled={!formValid || isLoading}
              className={`w-40 flex flex-col py-2 mt-6 mb-10 px-8 border-[1px] border-black rounded-lg text-white ${!formValid ? "opacity-50 cursor-not-allowed bg-[#784FD8]/30" : "hover:bg-[#784FD8]/70 bg-[#784FD8]"}`}
            >
              {isLoading ? "Creating..." : "Create Coin"}
            </button>
            :
            <ConnectButton />
          }
        </div>
      </div>
      {isLoading && <Spinner />}
    </div >
  );
}

import { BundleI, NetworkProviderI, bundles } from "@/data";
import Link from "next/link";
import { useRouter } from "next/navigation";

interface Props {
  selectedNetwork: NetworkProviderI;
  setSelectedBundle: (selected: BundleI) => void;
  selectedBundle: BundleI;
}

const BundleCard = ({
  setSelectedBundle,
  selectedNetwork,
  selectedBundle,
}: Props) => {
  const router = useRouter();

  const handleSubmit = (selected: BundleI) => {
    setSelectedBundle(selected);
    router.push(
      `/phone?network=${selectedNetwork.name}&bundle=${selectedBundle.id}`
    );
  };

  return (
    <>
      {bundles.map((bundle) => (
        <div
          key={bundle.id}
          onClick={() => handleSubmit(bundle)}
          className="w-full h-16 bg-neutral-100 flex flex-row items-center justify-between py-4 px-5 my-2 cursor-pointer"
        >
          <div className="flex flex-col">
            <p className="text-[9px] font-light text-neutral-400">Daily</p>
            <h4 className="text-xs font-medium">
              {bundle.amount} {bundle.size}
            </h4>
          </div>

          <div className="">
            <h4 className="text-xs font-medium">UGX {bundle.price}</h4>
          </div>
        </div>
      ))}
    </>
  );
};

export default BundleCard;

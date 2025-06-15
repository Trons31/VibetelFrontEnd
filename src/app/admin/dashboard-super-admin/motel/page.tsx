import Link from "next/link";
import { TableMotel } from "./ui/TableMotel";

export default function MotelPage() {
    return (
        <>
            <div className="bg-white rounded-lg"  >
                <div className="py-10 " >
                    <div className="md:mx-5 mb-10" >
                        <p className={`text-2xl font-medium `} >Moteles</p>
                        
                    </div>
                   
                   <TableMotel />

                </div>
            </div>
        </>
    );
}
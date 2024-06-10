import { useLoaderData } from "@remix-run/react"
import { PrintSpecKawasaki } from "./kawasaki"
import { PrintSpecSkiDoo } from "./skidoo"
import { PrintSpecSpyder } from "./spyder"
import { utilsLoader } from "./actions"
import { PrintSpecSwitch } from "./switch"
import { PrintSpecManitou } from "./manitou"
import { Button } from "~/components/ui/button"
import { PrintSpecSeaDoo } from "./seadoo"
import { PrintSpecCanAm } from "./canam"
import { PrintSpecBMWMoto } from "./bmwmoto"

export let loader = utilsLoader

export function PrintSpec() {
  const { modelData, finance } = useLoaderData();

  if (finance.brand === 'BMW-Motorrad') {
    return PrintSpecBMWMoto()
  }
  else if (finance.brand === 'Sea-Doo') {
    return PrintSpecSeaDoo()
  }
  else if (finance.brand === 'Can-Am') {
    return PrintSpecCanAm()
  }
  else if (finance.brand === 'Can-Am-SXS') {
    return (
      <Button disabled className="cursor-pointer w-auto border border-slate12  cursor-pointer hover:text-primary p-5 hover:border-primary hover:border" type="submit" content="update">
        Print Spec - Unavailable
      </Button>
    )
  }
  else if (finance.brand === 'Kawasaki') {
    return (
      <Button disabled className="cursor-pointer w-auto border border-slate12  cursor-pointer hover:text-primary p-5 hover:border-primary hover:border" type="submit" content="update">
        Print Spec - Unavailable
      </Button>
    )
  }
  else if (finance.brand === 'Ski-Doo') {
    return PrintSpecSkiDoo()
  }
  else if (finance.brand === 'Spyder') {
    return PrintSpecSpyder()
  }
  else if (finance.brand === 'Triumph') {
    return (
      <Button disabled className="cursor-pointer w-auto border border-slate12  cursor-pointer hover:text-primary p-5 hover:border-primary hover:border" type="submit" content="update">
        Print Spec - Unavailable
      </Button>
    )
  }
  else if (finance.brand === 'Switch') {
    return PrintSpecSwitch()
  }
  else if (finance.brand === 'Manitou') {
    return PrintSpecManitou()
  }
  else if (finance.brand === 'Suzuki') {
    return (
      <Button disabled className="cursor-pointer w-auto border border-slate12  cursor-pointer hover:text-primary p-5 hover:border-primary hover:border" type="submit" content="update">
        Print Spec - Unavailable
      </Button>
    )
  }
  else if (finance.brand === 'Harley-Davidson') {
    return (
      <Button disabled className="cursor-pointer w-auto border border-slate12   hover:text-primary p-5 hover:border-primary hover:border " type="submit" content="update">
        Print Spec - Unavailable
      </Button>
    )
  }
  else {
    return (<p>'cannot pin point a unit'</p>)
  }
};





/**
 *






  const handleClick = async () => {
    const url = generateUrl();


    if (url) {
      try {
        await downloadFile(url);
      } catch (error) {
        console.error('Error downloading file:', error);
      }
    }
  };

  async function downloadFile(url) {
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', '');
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }

  return (
    <Button onClick={handleClick}  className="h-5" type="submit" content="update">
      Spec Sheet
    </Button>
  );

 */

import { Container, WeaponModalDetail, WeaponList } from "./artifact-modal.style";

import { ICharacter, IWeaponData } from "../../interface/genshin.type";

type IProps = {
  isOpen: boolean;
  character: ICharacter | null;
  onClose: (state?: string, weapon?: IWeaponData) => void;
};

const ArtifactModal = (props: IProps) => {
  return <div>1234</div>;
};

export default ArtifactModal;

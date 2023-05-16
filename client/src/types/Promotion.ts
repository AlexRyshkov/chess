import Coords from './Coords';

type PromotionStatus = {
  isPending: boolean;
  from?: Coords;
  to?: Coords;
};

export default PromotionStatus;

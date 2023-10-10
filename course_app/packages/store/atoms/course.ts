import {atom} from "recoil";

interface AtomInt{
  isLoading : boolean,
  course : Course | null
}
export interface Course{
  title : string,
  price : string,
  image : string
}
export const courseState = atom<AtomInt>({
  key: 'courseState',
  default: {
    isLoading: true,
    course: null
  },
});

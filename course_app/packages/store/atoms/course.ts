import {atom} from "recoil";

export interface AtomInt{
  isLoading : boolean,
  course : Course | null
}
export interface Course{
  title : string,
  price : string,
  description: string,
  imageLink : string
  _id : string
}
export const courseState = atom<AtomInt>({
  key: 'courseState',
  default: {
    isLoading: true,
    course: null
  },
});

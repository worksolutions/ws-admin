export default interface SuggestInterface<CODE extends string | number = string> {
  title: string;
  code: CODE;
}

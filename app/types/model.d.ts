export default interface Model {
  name: string;
  icon: React.ReactNode;
  title: string;
  description: string;
  video: string;
  disabled?: boolean;
  details?: string[];
}

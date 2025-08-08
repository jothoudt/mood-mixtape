export interface MoodInputFormProps {
  genre: string;
  setGenre: (genre: string) => void;
  mood: string;
  setMood: (mood: string) => void;
  handleSubmit: (e: React.FormEvent) => void;
}

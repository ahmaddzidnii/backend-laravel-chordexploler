interface SongHeaderProps {
  song: any;
  className?: string;
}

export const SongHeader = ({ song, className }: SongHeaderProps) => {
  return (
    <div className={className}>
      <h1 className="text-lg font-semibold">Comedy (喜劇)</h1>
      <p className="text-muted-foreground">by Gen Hoshino</p>
    </div>
  );
};

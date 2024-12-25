

export default function Page() {
  return (
    <div className="flex flex-1 flex-col shad gap-4 p-4 ">
      <div className="grid auto-rows-min   gap-4 md:grid-cols-3">
        <div className="aspect-video shad rounded-xl bg-muted/50" />
        <div className="aspect-video shad rounded-xl bg-muted/50" />
        <div className="aspect-video shad rounded-xl bg-muted/50" />
      </div>
      <div className="aspect-video  shad rounded-xl bg-muted/50" />
    </div>
  );
}

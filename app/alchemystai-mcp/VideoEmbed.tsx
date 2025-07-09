// components/VideoEmbed.tsx
const VideoEmbed = () => {
  return (
    <div className="w-full aspect-video rounded-lg overflow-hidden shadow-lg">
      <iframe
        src="https://www.youtube.com/embed/dQw4w9WgXcQ" // replace with your video URL
        title="Embedded Video"
        frameBorder="0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
        className="w-full h-full"
      />
    </div>
  );
};

export default VideoEmbed;

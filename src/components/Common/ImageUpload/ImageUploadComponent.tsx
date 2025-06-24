import { Card, CardFooter, Image, Button } from "@heroui/react";

export default function ImageUploadComponent() {
  return (
    <Card isFooterBlurred className="border-none" radius="lg">
      <Image
        alt="Woman listing to music"
        className="object-cover"
        height={200}
        src="https://heroui.com/images/hero-card.jpeg"
        width={200}
      />
      <CardFooter className="absolute bottom-1 z-10 ml-1 w-[calc(100%_-_8px)] justify-between overflow-hidden rounded-large border-1 border-white/20 py-1 shadow-small before:rounded-xl before:bg-white/10">
        <Button
          className="bg-black/20 text-tiny text-white"
          color="default"
          radius="lg"
          size="sm"
          variant="flat"
        >
          Upload image
        </Button>
      </CardFooter>
    </Card>
  );
}

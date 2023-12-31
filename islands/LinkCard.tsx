import { JSX } from "preact/jsx-runtime";
import { ViewType } from "../hooks/useViewType.ts";
import { Link } from "../types/index.ts";

import LinkIcon from "https://deno.land/x/tabler_icons_tsx@0.0.1/tsx/link.tsx";
import TrashXIcon from "https://deno.land/x/tabler_icons_tsx@0.0.2/tsx/trash-x.tsx";
import DotsIcon from "https://deno.land/x/tabler_icons_tsx@0.0.2/tsx/dots.tsx";
import CameraIcon from "https://deno.land/x/tabler_icons_tsx@0.0.2/tsx/camera.tsx";
import DownloadIcon from "https://deno.land/x/tabler_icons_tsx@0.0.2/tsx/download.tsx";
import AppWindowIcon from "https://deno.land/x/tabler_icons_tsx@0.0.2/tsx/app-window.tsx";
import { useState } from "preact/hooks";
import Dropdown from "../components/Dropdown.tsx";
import Modal from "../components/Modal.tsx";

interface Props {
  type?: ViewType;
  showMenu?: boolean;
  link: Link;
  removeLink?: (link: Link) => void;
}

interface MenuItem {
  label: string;
  value: string;
  icon?: JSX.Element;
}

function genEmbedCode(link: Link) {
  const id = link.title;

  return `<iframe style="width:100%;height:100%;min-width:256px;" src="https://deno-news.deno.dev/l/${id}" frameBorder="0"></iframe>`;
}

export default function LinkCard(
  { type = "image-up", showMenu = false, link, removeLink }: Props,
) {
  const { url, title, description, image } = link;
  const [showModal, setShowModal] = useState(false);
  const [embedCode, setEmbedCode] = useState("");

  const [items, setItems] = useState<MenuItem[]>([
    // {
    //   label: "download",
    //   value: "download",
    //   icon: <DownloadIcon size={20} color="gray"></DownloadIcon>,
    // },
    {
      label: "embed",
      value: "embed",
      icon: <AppWindowIcon size={20} color="skyblue"></AppWindowIcon>,
    },
    {
      label: "remove",
      value: "remove",
      icon: <TrashXIcon size={20} color="red"></TrashXIcon>,
    },
  ]);

  const handleEmbed = () => {
    setShowModal(true);

    setEmbedCode(genEmbedCode(link));
  };

  const copyToClipboard = (str: string) => {
    const el = document.createElement("textarea");
    el.value = str;
    document.body.appendChild(el);
    el.select();
    document.execCommand("copy");
    document.body.removeChild(el);
  };

  const handleRemove = () => {
    removeLink?.(link);
  };

  return (
    <div
      class={`w-full relative flex bg-white rounded-lg shadow-md p-6 group ${
        type === "image-up" ? "flex-col" : "flex-row"
      }`}
      data-url={url}
    >
      {showMenu && (
        <>
          <Dropdown
            className="absolute top-2 right-2 text-sm text-gray-500 transition-opacity opacity-0 group-hover:opacity-100 cursor-pointer"
            icon={<DotsIcon />}
            items={items}
            onSelect={(item: MenuItem) => {
              switch (item.value) {
                case "embed":
                  handleEmbed();
                  break;
                case "remove":
                  handleRemove();
                  break;
                default:
                  break;
              }
            }}
          >
          </Dropdown>
          <Modal
            title="Embed"
            closeText="Copy"
            show={showModal}
            onClose={() => {
              copyToClipboard(embedCode);
              setShowModal(false);
            }}
          >
            <textarea
              className="w-full border-2 border-gray-300 p-2 rounded-lg"
              name="embed"
              value={embedCode}
              style="height: 120px;"
            >
            </textarea>
          </Modal>
        </>
      )}

      {type === "image-up" && (
        <>
          <img class="h-32 object-cover self-center z-100" src={image} alt="" />
          <div class="flex flex-col">
            <h2 class="text-xl font-bold mt-4">{title}</h2>
            <div class="text-gray-600 my-2 flex-1">{description}</div>
            <span class="inline-flex items-center text-gray-300 font-xs ">
              <LinkIcon size={16} />
              <a href={url} target="_blank">{url}</a>
            </span>
          </div>
        </>
      )}

      {type === "image-left" && (
        <>
          <div class="flex-none w-1/3">
            <img class="object-cover" src={image} alt="" />
          </div>
          <div class="flex-grow ml-4">
            <h2 class="text-xl font-bold">{title}</h2>
            <div class="text-gray-600 my-2 flex-1">{description}</div>
            <span class="inline-flex items-center text-gray-300 font-xs">
              <LinkIcon size={16} />
              <a href={url} target="_blank">{url}</a>
            </span>
          </div>
        </>
      )}
    </div>
  );
}

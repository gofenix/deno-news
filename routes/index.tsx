import { useSignal } from "@preact/signals";
import Counter from "../islands/Counter.tsx";
import { Head } from "$fresh/runtime.ts";

export default function Home() {
  const count = useSignal(3);
  return (
    <>
      <Head>
        <meta charset="UTF-8" />
        <title>Fresh App</title>
        <meta
          name="description"
          content="This is a brief description of Fresh"
        />
        <link />
        <script />
      </Head>
      <div data-theme="light">
        <div class="mockup-browser border border-base-300">
          <div class="mockup-browser-toolbar">
            <div class="input border border-base-300">https://daisyui.com</div>
          </div>
          <div class=" border-t border-base-300">
            <div class="px-4 py-8 mx-auto bg-[#86efac]">
              <div class="max-w-screen-md mx-auto flex flex-col items-center justify-center">
                <img
                  class="my-6"
                  src="/logo.svg"
                  width="128"
                  height="128"
                  alt="the Fresh logo: a sliced lemon dripping with juice"
                />
                <h1 class="text-4xl font-bold">Welcome to Fresh</h1>
                <p class="my-4">
                  Try updating this message in the
                  <code class="mx-2">./routes/index.tsx</code>{" "}
                  file, and refresh.
                </p>
                <Counter count={count} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

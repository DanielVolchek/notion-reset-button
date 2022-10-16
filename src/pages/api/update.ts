import { NextApiRequest, NextApiResponse } from "next";
import { Client } from "@notionhq/client";

export default async function api(req: NextApiRequest, res: NextApiResponse) {
  const notionClient = new Client({ auth: process.env.NOTION_SECRET_KEY });
  if (req.method !== "POST")
    return res.status(405).json({ message: "Method Not Allowed" });

  if (!process.env.NOTION_DB_KEY)
    return res
      .status(500)
      .json({ message: "Uh... Something Went Wrong On My end" });

  const initialData = await notionClient.databases.query({
    database_id: process.env.NOTION_DB_KEY,
  });

  for (let notionResult of initialData.results) {
    notionClient.pages.update({
      page_id: notionResult.id,
      properties: {
        Done: {
          // @ts-ignore
          checkbox: false,
        },
      },
    });
  }

  return res.status(200).json({ message: "Sucessfully Reset Database" });
}

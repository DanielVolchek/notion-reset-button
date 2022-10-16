import { NextApiRequest, NextApiResponse } from "next";
import { Client } from "@notionhq/client";

export default async function api(req: NextApiRequest, res: NextApiResponse) {
  const notionClient = new Client({ auth: process.env.NOTION_SECRET_KEY });
  if (!process.env.NOTION_DB_KEY)
    return res
      .status(500)
      .json({
        message: "Uh... Something Went Wrong On My end",
        result: process.env.NOTION_DB_KEY,
      });

  const initialData = await notionClient.databases.query({
    database_id: process.env.NOTION_DB_KEY,
  });

  for (const notionResult of initialData.results) {
    notionClient.pages.update({
      page_id: notionResult.id,
      properties: {
        Done: {
          // eslint-disable-next-line @typescript-eslint/ban-ts-comment
          // @ts-ignore
          checkbox: false,
        },
      },
    });
  }

  return res.status(200).json({ message: "Sucessfully Reset Database" });
}

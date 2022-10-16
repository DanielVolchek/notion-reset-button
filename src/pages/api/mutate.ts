import { Client } from "@notionhq/client";
import { NextApiRequest, NextApiResponse } from "next";

export default async function api(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "POST")
    return res.status(405).json({ message: "Method Not Allowed" });

  const notion = new Client({ auth: process.env.NOTION_SECRET_KEY });

  if (!process.env.NOTION_DB_KEY) return false;

  const dbid = await notion.databases.retrieve({
    database_id: process.env.NOTION_DB_KEY,
  });

  let response;
  try {
    response = await notion.pages.create({
      parent: { type: "database_id", database_id: process.env.NOTION_DB_KEY },
      properties: {
        Name: {
          title: [
            {
              text: {
                content: "Hello World",
              },
            },
          ],
        },
      },
    });
  } catch (err: any) {
    return res
      .status(500)
      .json({ message: "failed to update, error in error field", error: err });
  }
  return res.status(200).json({ message: response });
}

/*
import request = require("request");
import RequestCallback = request.RequestCallback;
import RequestResponse = request.RequestResponse;
*/

import * as WebRequest from 'web-request';

// Highscore contains methods to access a server-side highscore list.
export namespace Highscore {
    export interface Entry {
        name: string
        score: number
    }

    export interface Table {
        list: Array<Entry>
    }

    // top fetches the highscore list from the server.
    export async function top(): Promise<Array<Entry>> {
        try {
            let url = document.URL.replace("index.html", "highscore");
            let body = await WebRequest.json<Table>(url);
            return body.list
        } catch (e) {
            return []
        }
    }

    // submit a tentative score to the server.
    export async function submit(entry : Entry): Promise<boolean> {
        try {
            let url = document.URL.replace("index.html", "highscore");
            let resp = await WebRequest.post(url, { json: true }, entry);
            return true;
        } catch (e) {
            return false;
        }
    }

    /*
    export function top(): Array<Entry> {
        request.get("http://localhost:9001/invaders/highscore", (error: any, response: RequestResponse, body: any) => {
            console.log(error);
            console.log(body);
        });
        return []
    }

    export function submit(entry: Entry) {
        request.post("http://localhost:9001/invaders/highscore", { body: entry, json: true });
    }
    */
}
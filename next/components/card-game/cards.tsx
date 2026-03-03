import Card from "./card";
import { useEffect, useState, useContext } from 'react'
import { getDatabase, onValue, ref } from '@firebase/database'
import { FirebaseError } from '@firebase/util'
import { getApp, getApps, initializeApp } from 'firebase/app'

import LeftBottom from "../components/left-bottom";
import CenterField from "../components/center-card-field";

import { StoreContext } from '../conference/contexts';

const Cards = ({ channelId }: { channelId: string }) => {
    const context = useContext(StoreContext);
    const [cards, setCards] = useState<{ id: number, state: string, content: string }[]>([]);
    const [myMemberId, setMyMemberId] = useState<string>("");

    useEffect(() => {
        let unsubDb: (() => void) | undefined
        try {
            if (!getApps().length) initializeApp({ databaseURL: process.env.NEXT_PUBLIC_FIREBASE_DATABASE_URL })
            const db = getDatabase(getApp(), process.env.NEXT_PUBLIC_FIREBASE_DATABASE_URL!)
            const dbRef = ref(db, `/${channelId}/cards`)
            unsubDb = onValue(dbRef, (snapshot: any) => {
                const cardDatas = snapshot.val()
                console.log('Firebase cards snapshot:', cardDatas)
                if (!cardDatas) return
                const filteredCardDatas = []
                for (let i = 0; i < cardDatas.length; i++) {
                    if (cardDatas[i]) {
                        filteredCardDatas.push({ "id": i, "state": cardDatas[i].state, "content": cardDatas[i].content })
                    }
                }
                setCards(filteredCardDatas)
            }, (error) => {
                console.error('Firebase cards error:', error)
            })
        } catch (e) {
            console.error('Firebase setup error:', e)
        }
        return () => { if (unsubDb) unsubDb() }
    }, [channelId])

    useEffect(() => {
        setMyMemberId(context?.room?.member?.id ?? "");
    }, [context?.room?.member?.id]);

    return (
        <>
            <CenterField>
                <div className="flex justify-center items-center gap-4">
                    {cards.map((card) => (
                        card.state === 'Field' && (
                            <Card key={card.id} id={card.id} state={card.state} content={card.content} channelId={channelId} myMemberId={myMemberId} disabled={true} />
                        )
                    ))}
                </div>
            </CenterField>
            <LeftBottom>
                <div className="flex justify-center items-center gap-4">
                    {cards.map((card) => (
                        card.state === myMemberId && (
                            <Card key={card.id} id={card.id} state={card.state} content={card.content} channelId={channelId} myMemberId={myMemberId} />
                        )
                    ))}
                </div>
            </LeftBottom>
        </>
    );
};

export default Cards;

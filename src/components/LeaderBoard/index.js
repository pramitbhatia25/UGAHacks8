import { useState } from "react";
import { useEffect } from "react";
import "./index.scss";

function LeaderBoard() {

    useEffect(() => {
        getData();
    }, [])

    var [list_data, setListData] = useState([]);


    async function getData() {
        const res = await fetch("http://localhost:1337/api/fetchUsers", { method: "GET" });

        const data = await res.json();
        let temp = []
        console.log(data.users.length)
        let t_users = [];
        for (var i = 0; i < data.users.length; i++) {
            console.log("S", i)
            let sp = 0;            
            console.log(data.users[i])

            for (var j = 0; j < data.users[i].food_listings.length; j++) {
                sp += data.users[i].food_listings[j].no_of_spots;
            }
            t_users.push({
                name: data.users[i].name, spots: sp
            });
            console.log(t_users)
        }
        temp.push({ rank: "RANK", name: 'NAME', spots: "SPOTS", });
        for (let q = 0; q < data.users.length; q++) {
            temp.push({ rank: q + 1, name: t_users[q].name, spots: t_users[q].spots })
        }
        setListData(temp);
        console.log(temp);
}
    function ListItem(item) {
        console.log(item)
        return <div className="leaderboard_list_item">
            <div className="item rank">
                {item.i.rank}
            </div>
            <div className="item name">
                {item.i.name}
            </div>
            <div className="item spotss">
                {item.i.spots}
            </div>
        </div>
    }

    return <>
        <div className="leaderboard_list">
            {list_data.map((d) =>
                <ListItem key={d.handle} i={d} />
            )}
        </div>
    </>
}

export default LeaderBoard;
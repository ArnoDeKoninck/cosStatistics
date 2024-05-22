"use client";

import { FormEvent, useState } from "react";
import { useRouter } from "next/navigation";

interface CreateLogInterface {
	users: {
		id: string;
		name: string;
		class: string | null;
		subclass: string | null;
		createdAt: Date;
		updatedAt: Date;
	}[];
}
const CreateLog = ({ users }: CreateLogInterface) => {
	const [session, setSession] = useState<number>(0);
	const [character, setCharacter] = useState<string>("");
	const [damage, setDamage] = useState<number>(0);
	const router = useRouter();

	const handleChangeSession = (event: FormEvent<HTMLInputElement>) => {
		setSession(parseInt(event.currentTarget.value));
	};
	const handleChangeCharacter = (event: any) => {
		console.log(event.target.value);
		setCharacter(event.target.value);
	};

	const handleChangeDamage = (event: FormEvent<HTMLInputElement>) => {
		setDamage(parseInt(event.currentTarget.value));
	};

	const PostLog = (event: FormEvent<HTMLInputElement>) => {
		event.preventDefault();

		console.log("about to send:");
		console.log("session: ", session, " character: ", character, " damage: ", damage);

		try {
			fetch("/api/add-log", {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify({ session, character, damage }),
			});
			router.refresh();
		} catch (e) {
			console.error(e);
		}
	};

	return (
		<div style={{ border: "1px black" }}>
			<form className="">
				<label htmlFor="sessionSelect">Session:</label>
				<input type="number" name="session" id="sessionSelect" className="mx-5 bg-dark text-grey w-20 border-grey border" onChange={handleChangeSession}></input>
				<label htmlFor={"characterSelect"}>Character:</label>
				<select name="character" id="characterSelect" className="mx-5 bg-dark text-grey border-grey border" onChange={handleChangeCharacter}>
					{users.map((user) => (
						<option key={user.id}>{user.name}</option>
					))}
				</select>
				<label htmlFor="damageSelector" className="mr-5">
					Damage:
				</label>
				<input type="number" id={"damagSelector"} className="mr-5 bg-dark text-grey border-grey border w-40" onChange={handleChangeDamage}></input>
				<input type="submit" value="Add log to batch" onClick={PostLog} className="border border-grey p-1"></input>
			</form>
		</div>
	);
};

export default CreateLog;

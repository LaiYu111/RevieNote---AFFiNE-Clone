import {PageDB} from "@/db/schemas.ts";
import {formatTimestampToDate} from "@/utils.ts";

interface InfoProps {
	className?: string
	page: PageDB
}

function Info({className, page}: InfoProps){
	return (
		<div className={className}>
			<div className={'flex flex-col gap-3'}>
				<div>
					Updated {formatTimestampToDate(page.updatedAt)}
				</div>
				<hr/>
				<div>
					Info
				</div>
			</div>
		</div>
	)
}

export default Info

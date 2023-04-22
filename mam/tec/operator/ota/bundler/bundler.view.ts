namespace $.$$ {
	export class $tec_operator_ota_bundler extends $.$tec_operator_ota_bundler {

		@$mol_action
		upload(files: File[]) {
			const land = this.yard().land_grab();
			const dict = land.node("0_0", $hyoo_crowd_dict)

			for (const file of files) {
				dict.sub(file.name, $hyoo_crowd_blob).blob(
					file
				)
			}

			const blob = new $mol_blob( [$mol_wire_sync(land.world()!).delta_batch(land)] )
			
			const link = document.createElement('a')
			link.setAttribute('href', URL.createObjectURL(blob))
			link.setAttribute('download', this.download_name(land, dict.head))
			link.style.display = 'none'
			document.body.appendChild(link)
			link.click()
			document.body.removeChild(link)
		}

		async readFileAsBuffer(file: File) {
			let result_buffer = await new Promise((resolve) => {
				let fileReader = new FileReader();
				fileReader.onload = (e) => resolve(fileReader.result);
				fileReader.readAsArrayBuffer(file);
			});
			return result_buffer;
		}
		
		download_name( land : $hyoo_crowd_land, head: $mol_int62_string ) {
			return `${ land!.id() }!${ head }.bin`
		}

	}
}

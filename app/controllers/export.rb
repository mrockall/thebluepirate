BluePirate::App.controllers :export do
  
  get :'/' do
    export_service = ExportAsExcel.new
    export_service.execute

    file = export_service.download_file
    headers file[:headers]
    send_file file[:file]
  end
end
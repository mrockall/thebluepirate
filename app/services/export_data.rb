# ExportAsExcel class
# 
# Used to export the data from the tournaments as an excel sheet.
# 
class ExportAsExcel < BaseService

  # Store the data passed on initialize
  def initialize data={}
    @data = data
    @book = Spreadsheet::Workbook.new
    @file_path = Padrino.root('tmp', 'blue_pirate.xls')

    @header_format = Spreadsheet::Format.new(:color => :white, :weight => :bold, :size => 12, :pattern_fg_color => :grey, :pattern => 1)
    @score_column_offset = 6
  end

  def execute
    Tournament.order('id desc').all.each do |tournament|
      add_tournament_as_sheet(tournament)
    end

    @book.write(@file_path)
  end

  def download_file
    return unless File.exist? @file_path
    file = File.open(@file_path)
    { :file => file, :headers => headers }
  end

  def add_tournament_as_sheet tournament
    sheet = @book.create_worksheet(:name => tournament.name)

    t = Tournament.includes(:players, :scores => [:hole, :player], :tee_times => [:scores]).where(id: tournament.id).first
    c = Course.includes(:holes).find_by_id(t.course_id)

    add_headers(sheet, t, c)
    add_players(sheet, t)

    autofit(sheet)
  end

  def add_headers(sheet, tournament, course)
    0.upto(6) do |i|
      sheet.row(i).default_format = @header_format
    end

    sheet[0, 1] = tournament.name
    sheet[1, 1] = tournament.date
    sheet[2, 1] = course.name

    sheet[6, 1] = 'Player'
    sheet[6, 2] = 'Strokes'
    sheet[6, 3] = 'Points'

    sheet[3, @score_column_offset - 1] = 'Hole No'
    sheet[4, @score_column_offset - 1] = 'Par'
    sheet[5, @score_column_offset - 1] = 'Index'
    sheet[6, @score_column_offset - 1] = 'Length'

    column_offset = @score_column_offset
    course.holes.each_with_index do |hole, index|
      sheet[3, index + column_offset] = hole.number
      sheet[4, index + column_offset] = hole.par
      sheet[5, index + column_offset] = hole.index
      sheet[6, index + column_offset] = hole.length
    end
  end

  def add_players(sheet, tournament)
    # Offset to ensure we write below the header rows..
    row_offset = 7
    column_offset = @score_column_offset

    tournament.tee_times.order('points desc, score asc').each_with_index do |tee_time, player_index|
      row_number = row_offset + player_index*4

      # Add the position and name
      sheet[row_number, 0] = player_index + 1
      sheet[row_number, 1] = tee_time.player.name
      sheet[row_number, 2] = tee_time.score
      sheet[row_number, 3] = tee_time.points

      tee_time.scores.includes(:hole).order('holes.number asc').each_with_index do |score, score_index|
        sheet[row_number, score_index + column_offset] = score.score
        sheet[row_number + 1, score_index + column_offset] = score.points
        sheet[row_number + 2, score_index + column_offset] = score.result
      end
    end
  end

  private
  def autofit(worksheet)
    # Autofit
    (0...worksheet.column_count).each do |col|
      @high = 1
      row = 0
      worksheet.column(col).each do |cell|
        w = cell==nil || cell=='' ? 1 : cell.to_s.strip.split('').count+3
        ratio = worksheet.row(row).format(col).font.size/10
        w = (w*ratio).round
        if w > @high
          @high = w
        end
        row=row+1
      end
      worksheet.column(col).width = @high
    end
    (0...worksheet.row_count).each do |row|
      @high = 1
      col = 0
      worksheet.row(row).each do |cell|
        w = worksheet.row(row).format(col).font.size+4
        if w > @high
          @high = w
        end
        col=col+1
      end
      worksheet.row(row).height = @high
    end
  end

  # Get a file's headers, including content-type (mime type)
  # No native ruby (standard) libary for this, so we're using the unix system file command.
  # Not available on Windows
  def headers
    {
      'Content-Type' => 'application/vnd.ms-excel',
      'Content-Disposition' => 'attachment; filename="blue_pirate.xls"',
      'Expires' => 'Mon, 01 Jan 2001 00:00:00 GMT',
      'Cache-Control' => 'private, must-revalidate, no-cache, proxy-revalidate, max-age = 0, post-check = 0, pre-check = 0'
    }
  end
end


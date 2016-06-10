/**
 * Created by kamill on 6/7/16.
 */
module.exports = {
    WriteFile: function (str){

    var fh = fopen("./logs.txt", 3); // Open the file for writing

    if(fh!=-1) // If the file has been successfully opened
    {
        fwrite(fh, str); // Write the string to a file
        fclose(fh); // Close the file
    }
}
};